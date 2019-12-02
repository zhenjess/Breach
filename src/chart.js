/* Inspired by and Referred to https://bost.ocks.org/mike/chart/ for bubble chart*/

function bubbleChart() {
    //constants for sizing
    var width = window.innerWidth;
    var height = 400;

    //tooltip for mouseover functionality
    var tooltip = floatingTooltip('breach_tooltip', 250);

    //location to move bubbles towards depending on the view mode selected
    var center = { x: width / 2, y: height / 2 };

    var yearCenters = {
        2014: { x: width / 3, y: height / 2 },
        2015: { x: width / 2, y: height / 2 },
        2016: { x: 2 * width / 3, y: height / 2 },
        2017: { x: width / 3 - 100, y: height / 2 },
        2018: { x: width / 2 - 15, y: height / 2 },
        2019: { x: 2 * width / 3 + 100, y: height / 2 }
    };

    //X locations of the year titles
    var yearsTitleX = {
        2014: 160,
        2015: width / 2,
        2016: width - 160,
        2017: width / 3 - 100,
        2018: width / 1.5,
        2019: 2 * width / 3 + 125
    };

    //X locations of the breach types
    var typeCenters = {
        "Account Access": { x: width / 6, y: height / 2 },
        "Existential Data": { x: 2 * width / 6, y: height / 2 },
        "Financial Access": { x: 3 * width / 6, y: height / 2 },
        "Identity Theft": { x: 4 * width / 6, y: height / 2 },
        "Nuisance": { x: 5 * width / 6, y: height / 2 }
    }

    var typeTitleX = {
        "Account Access": width / 6,
        "Existential Data": 2 * width / 6 + 30,
        "Financial Access": 3 * width / 6 + 15,
        "Identity Theft": 4 * width / 6 + 25,
        "Nuisance": 5 * width / 6 + 35
    };

    //X locations of the breach sources

    var sourceCenters = {
        "Malicious Outsider": { x: width / 6, y: height / 2 },
        "Malicious Insider": { x: 2 * width / 6, y: height / 2 },
        "State Sponsored": { x: 3 * width / 6, y: height / 2 },
        "Accidental Loss": { x: 4 * width / 6, y: height / 2 },
        "Hacktivist": { x: 5 * width / 6, y: height / 2 }
    };


    var sourceTitleX = {
        "Malicious Outsider": width / 6,
        "Malicious Insider": 2 * width / 6 + 30,
        "State Sponsored": 3 * width / 6 + 15,
        "Accidental Loss": 4 * width / 6 + 25,
        "Hacktivist": 5 * width / 6 + 35
    };

    //X locations of the industry specific breaches
    var industryCenters = {
        "Technology": { x: width / 6, y: height / 2 },
        "Retail": { x: 2 * width / 6, y: height / 2 },
        "Financial": { x: 3 * width / 6, y: height / 2 },
        "Education": { x: 4 * width / 6, y: height / 2 },
        "Healthcare": { x: 5 * width / 6, y: height / 2 },
        "Government": { x: 6 * width / 6, y: height / 2 },
        "Other": { x: 7 * width / 6, y: height / 2 }
    };

    var industryTitleX = {
        "Technology": width / 6,
        "Retail": 2 * width / 6 + 30,
        "Financial": 3 * width / 6 + 15,
        "Education": 4 * width / 6 + 25,
        "Healthcare": 5 * width / 6 + 35,
        "Government": 6 * width / 6 + 10,
        "Other": 7 * width / 6 + 20
    };

    //@4 strength to apply to the position forces
    var forceStrength = 0.03;

    //set in create_nodes and create_vis
    var svg = null;
    var bubbles = null;
    var nodes = [];

    //charge function applied to nodes when there is a collision
    function charge(d) {
        return -Math.pow(d.radius, 2.0) * forceStrength;
    }

    //create force layout and simulation to add force to it
    var simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);

    //@v4 to prevent automatic force
    simulation.stop();

    //add color to bubbles
    // var fillColor = d3.scaleOrdinal()
    //     .domain(['Account Access', 'Identity Theft', 'Financial Access', 'Nuisance', 'Existential Data'])
    //     .range(['#ec1919', '#f48438', '#292bb0', '#16ab11', '#bed02b']);
    var fillColorByContinent = d3.scaleOrdinal()
        .domain(['Global', 'Asia', 'Africa', 'Australia', 'Europe', 'North America', "South America"])
        .range(['#ec1919', "#ff1f5a", '#00f9ff', "#7cbd1e", "#2fc5cc", "#303481", "#ff5b44"]);


    //convert raw data from CSV files into an array of node objects
    //each node stores data and visualization values to visualize a bubble
    //raw data is an array of data objects and passed in from d3.csv
    function createNodes(rawData) {

        //use max totla_amt in data as max in scale's domain
        var maxAmount = d3.max(rawData, function (d) { return +d.records; });


        //bubble size based on records loss
        // @v4: new flattended scale names
        var radiusScale = d3.scalePow()
            .exponent(0.5)
            .range([2, 85])
            .domain([0, maxAmount]);



        //user map() to convert raw data into node data
        var myNodes = rawData.map(function (d) {
            return {
                id: d.id,
                radius: radiusScale(+d.records),
                value: +d.records,
                name: d.organization,
                type: d.type,
                source: d.source,
                industry: d.industry,
                group: d.group,
                year: d.year,
                continent: d.continent,
                x: Math.random() * 900,
                y: Math.random() * 800
            };
        });



        //sort to prevent occlusion of smaller nodes
        myNodes.sort(function (a, b) { return b.value - a.value; });

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
    var chart = function chart(selector, rawData) {

        nodes = createNodes(rawData);



        svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);


        bubbles = svg.selectAll('.bubble')
            .data(nodes, function (d) { return d.id; });

        //create new circles where 1 circle.bubble for each object in nodes array
        var bubblesE = bubbles.enter().append('circle')
            .classed('bubble', true)
            .attr('r', 0)
            .attr('fill', function (d) { return fillColorByContinent(d.group); })
            .attr('stroke', function (d) { return d3.rgb(fillColorByContinent(d.group)).darker(); })
            .attr('stroke-width', 2)
            .on('mouseover', showDetail)
            .on('mouseout', hideDetail);

        //@v4 merge original empty selection and enter selection
        bubbles = bubbles.merge(bubblesE);


        //to make bubbles appear
        bubbles.transition()
            .duration(2000)
            .attr('r', function (d) { return d.radius; });


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
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });
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

        //reset 'x' force to draw bubbles to the center
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

        //can reset alpha value and restart simulation
        simulation.alpha(1).restart();
    }


    /*
     * Sets visualization in "split by year mode".
     * The year labels are shown and the force layout
     * tick function is set to move nodes to the
     * yearCenter of their data's year.
     */
    function splitBubbles() {
        showYearTitles();

        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));
        simulation.alpha(1).restart();
    }

    function typeSplitBubbles() {
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeTypePos));
        simulation.alpha(1).restart();
    }

    function sourceSplitBubbles() {
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeSourcePos));
        simulation.alpha(1).restart();
    }

    function industrySplitBubbles() {
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeIndustryPos));
        simulation.alpha(1).restart();
    }

    /*
     * Hides Year title displays.
     */
    function hideYearTitles() {
        svg.selectAll('.year').remove();
    }

    /*
     * Shows Year title displays.
     */
    function showYearTitles() {
       var yearsData = d3.keys(yearsTitleX);
        var years = svg.selectAll('.year')
            .data(yearsData);

        years.enter().append('text')
            .attr('class', 'year')
            .attr('x', function (d) { return yearsTitleX[d]; })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function (d) { return d; });
    }

    function hideTypeTitles() {
        svg.selectAll('.type').remove();
    }

    function showTypeTitles() {
        var typeData = d3.keys(typeTitleX);
        var types = svg.selectAll('.type')
            .data(typeData);

        types.enter().append('text')
            .attr('class', 'type')
            .attr('x', function (d) { return typeTitleX[d]; })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function (d) { return d; });
    }

    function hideSourceTitles() {
        svg.selectAll('.source').remove();
    }

    function showSourceTitles() {
        var sourceData = d3.keys(sourceTitleX);
        var sources = svg.selectAll('.source')
            .data(sourceData);

        sources.enter().append('text')
            .attr('class', 'source')
            .attr('x', function (d) { return sourceTitleX[d]; })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function (d) { return d; });
    }

    function hideIndustryTitles() {
        svg.selectAll('.industry').remove();
    }

    function showIndustryTitles() {
        var industryData = d3.keys(industryTitleX);
        var industries = svg.selectAll('.industry')
            .data(industryData);

        industries.enter().append('text')
            .attr('class', 'industry')
            .attr('x', function (d) { return industryTitleX[d]; })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function (d) { return d; });
    }



    /*
     * Function called on mouseover to display the
     * details of a bubble in the tooltip.
     */
    function showDetail(d) {

        d3.select(this).attr('stroke', 'black');

        var content = '<span class="name">Title: </span><span class="value">' +
            d.name +
            '</span><br/>' +
            '<span class="name">Amount: </span><span class="value">' +
            addCommas(d.value) +
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
            .attr('stroke', d3.rgb(fillColorByContinent(d.group)).darker());

        tooltip.hideTooltip();
    }

    chart.toggleDisplay = function (displayName) {
        if (displayName === 'year') {
            hideTypeTitles();
            hideSourceTitles();
            hideIndustryTitles();
            showYearTitles();
            splitBubbles();
        } else if (displayName === 'type') {
            hideYearTitles();
            hideSourceTitles();
            hideIndustryTitles();
            showTypeTitles();
            typeSplitBubbles();
        } else if (displayName == 'source') {
            hideYearTitles();
            hideTypeTitles();
            showSourceTitles();
            hideIndustryTitles();
            sourceSplitBubbles();
        } else if (displayName == 'industry') {
            hideYearTitles();
            hideTypeTitles();
            showIndustryTitles();
            industrySplitBubbles();
        } else {
            hideTypeTitles();
            hideSourceTitles();
            hideIndustryTitles();
            groupBubbles();
        }
    };

    //return chart function from closure
    return chart;
}


var myBubbleChart = bubbleChart();


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
        .on('click', function () {

            d3.selectAll('.button').classed('active', false);

            var button = d3.select(this);


            button.classed('active', true);


            var buttonId = button.attr('id');



            myBubbleChart.toggleDisplay(buttonId);
        });
}

//helper function converts number to string
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
}

//load data
d3.csv('data/breach_data.csv', display);

//setup buttons
setupButtons();
