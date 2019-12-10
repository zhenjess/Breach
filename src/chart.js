/* Inspired by and Referred to https://bost.ocks.org/mike/chart/ for bubble chart*/
import * as d3 from "d3";
import floatingTooltip from "./tooltip";


function bubbleChart() {
    //constants for sizing
    let width = 2100;
    let height = 900;

    //tooltip for mouseover functionality
    let tooltip = floatingTooltip('breach_tooltip', 250);

    //location to move bubbles towards depending on the view mode selected
    let center = { x: [width / 3], y: [height / 2] };

    let yearCenters = {
        2014: { x: [(width / 3) - 300], y: [height / 2] },
        2015: { x: [(width / 3) - 155], y: [height / 2] },
        2016: { x: [(width / 3) - 5], y: [height / 2] },
        2017: { x: [(width / 3) + 120], y: [height / 2] },
        2018: { x: [(width / 3) + 275], y: [height / 2] },
        2019: { x: [(width / 3) + 400], y: [height / 2] }
    };

    //X locations of the year titles
    let yearsTitleX = {
        2014: 230,
        2015: [(width / 4) - 100],
        2016: [(width / 4) + 110],
        2017: [(width / 3) + 175],
        2018: [(width / 3) + 390],
        2019: [(width / 3) + 600]
    };

    //X locations of the breach types
    let typeCenters = {
        "Account Access": { x: [(width / 3) - 275], y: [height / 2] },
        "Existential Data": { x: [(width / 3) - 90], y: [height / 2] },
        "Financial Access": { x: [(width / 3) + 125], y: [height / 2] },
        "Identity Theft": { x: [(width / 3) + 280], y: [height / 2] },
        "Nuisance": { x: [(width / 3) + 450], y: [height / 2] }
    }

    let typesTitleX = {
        "Account Access": 300,
        "Existential Data": [(width / 4) + 40],
        "Financial Access": [(width / 4) + 220],
        "Identity Theft": [(width / 3) + 360],
        "Nuisance": [(width / 3) + 700]
    };

    // //X locations of the breach sources

    let sourceCenters = {
        "Malicious Outsider": { x: [(width / 3) - 275], y: [height / 2] },
        "Malicious Insider": { x: [(width / 3) - 90], y: [height / 2] },
        "State Sponsored": { x: [(width / 3) + 125], y: [height / 2] },
        "Accidental Loss": { x: [(width / 3) + 280], y: [height / 2] },
        "Hacktivist": { x: [(width / 3) + 450], y: [height / 2] }
    };


    let sourcesTitleX = {
        "Malicious Outsider": 300,
        "Malicious Insider": [(width / 3) + 20],
        "State Sponsored": [(width / 3) + 200],
        "Accidental Loss": [(width / 3) + 400],
        "Hacktivist": [(width / 3) + 650]
    };

    // //X locations of the industry specific breaches
    let industryCenters = {
        "Technology": { x: [(width / 4) - 300], y: [height / 2] },
        "Retail": { x: [(width / 4) - 155], y: [height / 2] },
        "Financial": { x: [(width / 4) - 5], y: [height / 2] },
        "Education": { x: [(width / 4) + 120], y: [height / 2] },
        "Healthcare": { x: [(width / 3) + 275], y: [height / 2] },
        "Government": { x: [(width / 3) + 400], y: [height / 2] },


        // "Technology": { x: [width / 6], y: [height / 2] },
        // "Retail": { x: [(2 * width) / 6], y: [height / 2] },
        // "Financial": { x: [(2.5 * width) / 6], y: [height / 2] },
        // "Education": { x: [(3 * width) / 6], y: [height / 2] },
        // "Healthcare": { x: [(3.5 * width) / 6], y: [height / 2] },
        // "Government": { x: [(4 * width) / 6], y: [height / 2] },
        // "Other": { x: [(4.6 * width) / 6], y: [height / 2] }
    };

    let industrysTitleX = {
        "Technology": [width / 6],
        "Retail": [(2 * width / 6) + 30],
        "Financial": [(2.5 * width / 6) + 15],
        "Education": [(3 * width / 6) + 25],
        "Healthcare": [(3.5 * width / 6) + 35],
        "Government": [(4 * width / 6) + 10],
        "Other": [(4.6 * width / 6) + 20]
    };

    //@4 strength to apply to the position forces
    let forceStrength = 0.03;

    //set in create_nodes and create_vis
    let svg = null;
    let bubbles = null;
    let nodes = [];

    //charge function applied to nodes when there is a collision
    function charge(d) {
        return -Math.pow(d.radius, 2.0) * forceStrength;
    }

    //create force layout and simulation to add force to it
    let simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        //.size([center.x - 50, 2000])
        .on('tick', ticked);

    //@v4 to prevent automatic force
    simulation.stop();

    //add color to bubbles

    let fillColorByContinent = d3.scaleOrdinal()
        .domain(['Global', 'Asia', 'Africa', 'Australia', 'Europe', 'North America', 'South America'])
        .range(['#19ecc2', '#ff1f5a', '#ec7b19', '#7cbd1e', '#2fc5cc', '#303481', '#ecec19']);


    //convert raw data from CSV files into an array of node objects
    //each node stores data and visualization values to visualize a bubble
    //raw data is an array of data objects and passed in from d3.csv
    function createNodes(rawData) {

        //use max record losses in data as max in scale's domain
        let maxAmount = d3.max(rawData, function(d) { 
            return +d.records; 
        });


        //bubble size based on records loss
        // @v4: new flattended scale names
        let radiusScale = d3.scalePow()
            .exponent(0.5)
            .range([10, 100])
            .domain([0, maxAmount]);



        //user map() to convert raw data into node data
        let myNodes = rawData.map(function(d) {
            return {
                id: d.id,
                radius: radiusScale(+d.records),
                value: +d.records,
                name: d.organization,
                type: d.type,
                source: d.source,
                industry: d.industry,
                year: d.year,
                location: d.location,
                continent: d.continent,
                x: Math.random() * 900,
                y: Math.random() * 800
            };
        });



        //sort to prevent occlusion of smaller nodes
        myNodes.sort(function(a, b) { 
            return (b.value - a.value); 
        });

        return myNodes;
    }

    /*
     * Main entry point to the bubble chart. This function is returned
     * by the parent closure. It prepares the rawData for visualization
     * and adds an svg element to the provided selector and starts the
     * visualization creation process.
     *
     * selector is expected to be a DOM element or CSS selector that
     * points to the parent element of the bubble chart. Inside this
     * element, the code will add the SVG continer for the visualization.
     *
     * rawData is expected to be an array of data objects as provided by
     * a d3 loading function like d3.csv.
     */
    let chart = function chart(selector, rawData) {

        nodes = createNodes(rawData);



        svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);


        bubbles = svg.selectAll('.bubble')
            .data(nodes, function(d) { 
                return d.id; 
            });

        //create new circles where 1 circle.bubble for each object in nodes array
        let bubblesE = bubbles.enter().append('circle')
            .classed('bubble', true)
            .attr('r', 0.001)
            .attr('fill', function(d) { 
                return fillColorByContinent(d.continent); 
            })
            .attr('stroke', function(d) { 
                return d3.rgb(fillColorByContinent(d.continent)).darker(); 
            })
            .attr('stroke-width', 2)
            .on('mouseover', showDetail)
            .on('mouseout', hideDetail);

        //@v4 merge original empty selection and enter selection
        bubbles = bubbles.merge(bubblesE);


        //to make bubbles appear
        bubbles.transition()
            .duration(2000)
            .attr('r', function(d) { 
                return d.radius; 
            });


        //simulation's nodes set to run automatically
        simulation.nodes(nodes);

        //initially start as 1 bubble group
        groupBubbles();
    };

    /*
     * Callback function that is called after every tick of the
     * force simulation.
     * Here we do the acutal repositioning of the SVG circles
     * based on the current x and y values of their bound node data.
     * These x and y values are modified by the force simulation.
     */
    function ticked() {
        bubbles
            .attr('cx', function(d) { 
                return d.x; 
            })
            .attr('cy', function(d) { 
                return d.y; 
            });
    }

    /*
     * Provides a x value for each node to be used with the split by year
     * x force.
     */
    function nodeYearPos(d) {
        return yearCenters[d.year].x;
    }

    function nodeTypePos(d) {
        return typeCenters[d.type].x;
    }

    function nodeSourcePos(d) {
        return sourceCenters[d.source].x;
    }

    function nodeIndustryPos(d) {
        return industryCenters[d.industry].x;
    }

    /*
     * Sets visualization in "single group mode".
     * The year labels are hidden and the force layout
     * tick function is set to move all nodes to the
     * center of the visualization.
     */
    function groupBubbles() {
        hideYearTitles();
        hideTypeTitles();
        hideSourceTitles();
        hideIndustryTitles();
        
        //reset 'x' force to draw bubbles to the center
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

        //can reset alpha value and restart simulation
        simulation.alpha(1).restart();
    }

    document.getElementById('all').addEventListener('click', function() {
        groupBubbles();
    });

    /*
     * Sets visualization in "split by year mode".
     * The year labels are shown and the force layout
     * tick function is set to move nodes to the
     * yearCenter of their data's year.
     */
    
    
    function splitBubbles() {
        showYearTitles();
        hideTypeTitles();
        hideSourceTitles();
        hideIndustryTitles();
        simulation.force('x', d3.forceX().strength(forceStrength).x((nodeYearPos)));
        simulation.alpha(1).restart();  
    }
    
   //const yrButton = d3.select('#year')
    // yrButton.onclick = splitBubbles;
    //yrButton.onclick = () => console.log('hello');
    // document.getElementById('year')
    document.getElementById('year').addEventListener('click', function() {
      splitBubbles();
    });

    /*Hides Year title displays.*/
    function hideYearTitles() {
        svg.selectAll('.year').remove();
    }

    /* Shows Year title displays.*/
    function showYearTitles() {
        let yearsData = d3.keys(yearsTitleX);
        let years = svg.selectAll('.year')
            .data(yearsData);

        years.enter().append('text')
            .attr('class', 'year')
            .attr('x', function(d) { 
                return yearsTitleX[d]; 
            })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function(d) { 
                return d; 
            });
    }

    //type
    function typeSplitBubbles() {
        hideYearTitles();
        showTypeTitles();
        hideSourceTitles();
        hideIndustryTitles();
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeTypePos));
        simulation.alpha(1).restart();
    }

    document.getElementById('type').addEventListener('click', function() {
        typeSplitBubbles();
    });

    function hideTypeTitles() {
        svg.selectAll('.type').remove();
    }

    /* Shows Type title displays.*/
    function showTypeTitles() {
        let typesData = d3.keys(typesTitleX);
        let types = svg.selectAll('.type')
            .data(typesData);

        types.enter().append('text')
            .attr('class', 'type')
            .attr('x', function(d) { 
                return typesTitleX[d]; 
            })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function(d) { 
                return d;
            });
    }

    //source
    function sourceSplitBubbles() {
        showSourceTitles();
        hideYearTitles();
        hideTypeTitles();
        hideIndustryTitles();
        simulation.force('x', d3.forceX().strength(forceStrength).x((nodeSourcePos)));
        simulation.alpha(1).restart();
    }

    document.getElementById('source').addEventListener('click', function() {
        sourceSplitBubbles();
    });

    function hideSourceTitles() {
        svg.selectAll('.source').remove();
    }

    function showSourceTitles() {
        let sourcesData = d3.keys(sourcesTitleX);
        let sources = svg.selectAll('.source')
            .data(sourcesData);

        sources.enter().append('text')
            .attr('class', 'source')
            .attr('x', function(d) { 
                return sourcesTitleX[d]; 
            })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function(d) { 
                return d; 
            });
    }

    //industry
    function industrySplitBubbles() {
        showIndustryTitles();
        hideYearTitles();
        hideTypeTitles();
        hideSourceTitles();
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeIndustryPos));
        simulation.alpha(1).restart();
    }


    document.getElementById('industry').addEventListener('click', function() {
        industrySplitBubbles();
    });

    /*Hides industry title displays.*/
    function hideIndustryTitles() {
        svg.selectAll('.industry').remove();
    }

    /* Shows industry title displays.*/
    function showIndustryTitles() {
        let industrysData = d3.keys(industrysTitleX);
        let industrys = svg.selectAll('.industry')
            .data(industrysData);

        industrys.enter().append('text')
            .attr('class', 'industry')
            .attr('x', function(d) {
                return industrysTitleX[d];
            })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return d;
            });
    }

    
    /*
     * Function called on mouseover to display the
     * details of a bubble in the tooltip.
     */
    function showDetail(d) {

        d3.select(this).attr('stroke', 'black');

        let content = '<span class="name">Organization: </span><span class="value">' +
            d.name +
            '</span><br/>' +
            '<span class="name">Breached Records: </span><span class="value">' +
            addCommas(d.value) +
            '</span><br/>' +
            '<span class="name">Country: </span><span class="value">' +
            d.location +
            '</span><br/>' +
            '<span class="name">Year: </span><span class="value">' +
            d.year +
            '</span>';

        tooltip.showTooltip(content, d3.event);
    }

    /*
     * Hides tooltip
     */
    function hideDetail(d) {
        //reset outline
        d3.select(this)
            .attr('stroke', d3.rgb(fillColorByContinent(d.continent)).darker());

        tooltip.hideTooltip();
    }

    chart.toggleDisplay = function(displayName) {
        if (displayName === 'all') {
            hideYearTitles();
            hideTypeTitles();
            hideSourceTitles();
            hideIndustryTitles();
            groupBubbles();
        } else if (displayName === 'year') {
            showYearTitles();
            hideTypeTitles();
            hideSourceTitles();
            hideIndustryTitles();
            splitBubbles();
        } else if (displayName === 'type') {
            hideYearTitles();
            showTypeTitles();
            hideSourceTitles();
            hideIndustryTitles();
            typeSplitBubbles();
        } else if (displayName === 'source') {
            hideYearTitles();
            hideTypeTitles();
            showSourceTitles();
            hideIndustryTitles();
            sourceSplitBubbles();
        } else if (displayName === 'industry') {
            hideYearTitles();
            hideTypeTitles();
            hideSourceTitles();
            showIndustryTitles();
            industrySplitBubbles();
        } else {
            hideIndustryTitles();
            groupBubbles();
        }
    };

    //return chart function from closure
    return chart;
}


let myBubbleChart = bubbleChart();


function display(error, data) {
    if (error) {
        console.log(error);
    }

    myBubbleChart('#vis', data);
}

//sets up layout buttons to allow for toggle between view modes
function setupButtons() {
    d3.select('#toolbar')
        .selectAll('.button')
        .on('click', function() {

            d3.selectAll('.button').classed('active', false);

            let button = d3.select(this);

            button.classed('active', true);

            let buttonId = button.attr('id');

            myBubbleChart.toggleDisplay(buttonId);
        });
}

//helper function converts number to string
function addCommas(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
}

//load data
d3.csv('data/breach_data.csv', display);

//setup buttons
setupButtons();

// debugger
// document.getElementById('year').addEventListener('click', function () {
//     //     document.getElementById('year').innerHTML = "Hello World";
//     console.log("Hello World");
// });