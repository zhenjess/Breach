// import {
//     scaleLinear, 
//     format, 
//     extent,
//     axisLeft,
//     axisBottom,
// } from 'd3';

import * as d3 from "d3";

export const trendGraph = (selection, props) => {
    const {
        title,
        margin,
        data,
        xValue,
        xAxisLabel,
        yValue,
        yAxisLabel,
        width,
        height, 
        circleRadius
    } = props;

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    //initialize graph container
    const g = selection.d3.selectAll('.graph-container').data([null]);
    const gEnter = g
        .enter().append('g')
            .attr('class', 'graph-container');

    gEnter
        .merge(g)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //map data x-range to graph range
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    //map data y-range to graph range
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue).reverse())
        .range([0, innerHeight])
        .nice();

    //set x-axis
    const axisTickFormat = (number) => d3.format('~s')(number);

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(axisTickFormat)
        .tickSize(-innerHeight)
        .tickPadding(10);

    const xAxisGroup = g.select('.x-axis');

    const xAxisGroupEnter = gEnter  
        .append('g')
            .attr('class', 'x-axis');

    xAxisGroup
        .merge(xAxisGroupEnter)
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll('.domain').remove();



    //set y-axis
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(axisTickFormat)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisGroup = g.d3.select('.y-axis');

    const yAxisGroupEnter = gEnter
        .append('g')
            .attr('class', 'y-axis');
    
    yAxisGroup
        .merge(yAxisGroupEnter)
            .d3.call(yAxis)
            .d3.selectAll('.domain').remove();

    //set x-axis label
    const xAxisLabelText = xAxisGroupEnter
        .append('text')
            .attr('class', 'axis-label')
            .attr('y', 50)
        .merge(xAxisGroup.d3.select('.axis-label'))
            .attr('x', innerWidth / 2)
            .text(xAxisLabel);
    
    //set y-axis label
    const yAxisLabelText = yAxisGroupEnter
        .append('text')
            .attr('class', 'axis-label')
            .attr('y', -50)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
        .merge(yAxisGroup.d3.select('.axis-label'))
            .attr('y', -innerHeight / 2)
            .text(yAxisLabel);
    

    //render graph content
    const circles = g.d3.merge(gEnter)
        .selectAll('circle').data(data)

    circles
        .enter().append('circle')
            .attr('cx', innerWidth / 2)
            .attr('cy', innerHeight / 2)
            .attr('r', 0)
        .merge(circles)
        .transition().duration(2500)
        .delay((d, i) => i)
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius);

    //render graph label
    const titleGroup = g.d3.select('.graph-label');

    const titleGroupEnter = gEnter
        .append('g')
            .attr('class', 'graph-label');

    titleGroup
        .d3.merge(titleGroupEnter);

    const graphTitle = titleGroupEnter
        .append('text')
            .attr('class', 'graph-label')
            .attr('y', -25)
        .d3.merge(titleGroup.select('.graph-label'))
            .text(title);
};

