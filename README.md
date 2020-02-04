## Global Data Breaches (2014 - 2019) Report (Data Visualization)

[Live Link](https://zhenjess.github.io/Breach/)

![Screen Shot 2020-02-04 at 12 49 39 PM](https://user-images.githubusercontent.com/35883332/73785848-fd3de500-474c-11ea-84bd-9e284a7bdf3f.png)
![Screen Shot 2020-02-04 at 12 49 53 PM](https://user-images.githubusercontent.com/35883332/73785862-029b2f80-474d-11ea-949a-b5d2818fc44e.png)
![Screen Shot 2020-02-04 at 12 50 07 PM](https://user-images.githubusercontent.com/35883332/73785871-05962000-474d-11ea-84a2-9d49a4eb137e.png)

![Screen Shot 2020-01-28 at 11 20 16 AM](https://user-images.githubusercontent.com/35883332/73297876-33b1b800-41c1-11ea-8ee8-0e3f1c070002.png)
![Screen Shot 2020-01-28 at 11 20 28 AM](https://user-images.githubusercontent.com/35883332/73297917-46c48800-41c1-11ea-96cb-5af65c1f245d.png)
![Screen Shot 2020-01-28 at 11 20 40 AM](https://user-images.githubusercontent.com/35883332/73297947-55ab3a80-41c1-11ea-90f2-c19c45887720.png)

### Background and Overview
Global Data Breach (2014 - 2019) Report is an interactive data visualization based off the based off the annual Breach Level Index Report. An estimate of 400 breach incident data points over 6 years (2014 - 2019) were 
aggregated to give an exploratory visual of the state of breach incidents.

This visualization focuses on breach incidents per: year, source, type, industry, location, where an estimate of 10 million data records are lost or stolen around the world on a daily basis.
As the amount of data produced around the world increases, the amount of data breach incidents also fluctuates. 
North America is by far the main victim of data breaches and the main offender of data breaches is malicious outsiders.

This tool allows you to better visualize and understand data breach susceptibility through the years by customizing the statistics.

This app will consist of a single page that displays a dynamic bubble chart and a legend.

When users hover over a bubble, a tooltip will be rendered to display the details of their breach incident.

Data provided by [Breach Level Index](https://breachlevelindex.com/) 
Visualization created by [Jessica Zhen] 


## Technologies
* D3.js for DOM manipulation and rendering
* JavaScript (ES6) for general application logic
* Webpack
* Babel
* HTML5
* CSS3

## Features
* Users can interact with the individual data points to see further data on each country (bubble) on hover
* Users can develop correlation hypotheses on year, source, type, and industry
* Users can filter data by both breach incidents and metrics 

![Screen Shot 2020-01-28 at 11 21 03 AM](https://user-images.githubusercontent.com/35883332/73297987-62c82980-41c1-11ea-94a3-6dd45f2d3762.png)
![Screen Shot 2020-01-28 at 11 21 15 AM](https://user-images.githubusercontent.com/35883332/73298015-71164580-41c1-11ea-9bbf-b19f796e2293.png)

Data Chart (D3.js)
Clean and modular code through use of ES6 classes and inheritance.
        


      let chart = function chart(selector, rawData) {
        nodes = createNodes(rawData);
        svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'scale(0.70)');

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

        // merge original empty selection and enter selection
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

A parent class, Chart, was implemented to initialize the base configuration for the (D3.js) visualization. New node objects were created from raw data to generate a bubble group.

Data (CSV)

Data was aggregated from multiple sources and formatted into CSV. The CSV file is loaded asynchronously into the D3 visualization.


Future Plans
Some features I plan on implement in the future are:

Graphs to better visualize trends 


