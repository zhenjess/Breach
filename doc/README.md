## Global Data Breaches Visualization 

### Background and Overview

**Global Data Breaches Visualization**, is an interactive data visualization based off the annual Breach Level Index Report. An estimate of 400 breach incident data points over 6 years (2014 - 2019) were 
aggregated to give an exploratory visual of the state of breach incidents.

This visualization focuses on breach incidents per: source, type, industry, location, where 
an estimate of 10 million data records are lost or stolen around the world on a daily basis.
As the amount of data produced around the world increases, the amount of data breach incidents also fluctuates. 
North America is by far the main victim of data breaches and the main offender of data breaches is malicious outsiders.

This tool allows you to better visualize and understand data breach susceptibility through the years 
by customizing the statistics.

Data provided by [Breach Level Index](https://breachlevelindex.com/) 
Visualization created by [Jessica Zhen] 


## Features
* Users can interact with the individual data points to see further data on each country
* Users can develop correlation hypotheses on GDP, social support, generosity, freedom, life expectancy and population
* Users can filter data by both continent and metrics from individual countries

## Data Chart (D3.js)

Clean and modular code through use of ES6 classes and inheritance.

## Data (CSV)

Data was aggregated from multiple sources and formatted into CSV. The CSV file is loaded asynchronously into the D3 visualization.

## Functionality & MVP

Users will be able to:
- [ ] View countries on a interactive bubble chart
- [ ] See at a glance who are victims of data breach and what is the source of the breach incident 
- [ ] Hover over a bubble to get a detailed breakdown of its breach incident report

## Wireframes

This app will consist of a single page that displays a dynamic bubble chart and a legend.

When users hover over a bubble, a tooltip will be rendered to display the details of their breach incident.

## Architecture and Technologies
This project will be implemented with the following technologies:

+ `JavaScript` for general application logic
+ `D3.js` for DOM manipulation and rendering
+ Webpack
+ Babel
+ HTML5
+ CSS3

In addition to the entry file, there will be a script involved in this project (tentative):
+ `chart.js` - main application logic

## Implementation Timeline

**Day 1:**
- [ ] Research D3.js and options for rendering a bubble chart
- [ ] Work through tutorials to learn how to use the D3 library

**Day 2:**
- [ ] Set up index.html with D3.js and webpack to bundle code
- [ ] Learn enough D3.js to render countries as polygons on the screen

**Day 2:**
- [ ] Continue with D3.js - countries should now be rendered and color-coded by breach records loss
- [ ] Render a bubble chart

**Day 3:**
- [ ] Continue with bubble chart if not yet completed
- [ ] Render a tooltip with corresponding data upon hovering over a country

**Day 4:**
- [ ] Add styling and animations


## Future Plans
Some features I plan on implement in the future are:

* the ability for users to view data from previous years' studies
* slicing and filtering data based on additional parameters 