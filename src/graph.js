import {
    scaleLinear, 
    format, 
    extent,
    axisLeft,
    axisBottom,
} from 'd3';

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
    const g = selection.selectAll('.graph-container').data([null]);
    const gEnter = g
        .enter().append('g')
            .attr('class', 'graph-container');

    gEnter
        .merge(g)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //map data x-range to graph range
    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    //map data y-range to graph range
    const yScale = scaleLinear()
        .domain(extent(data, yValue).reverse())
        .range([0, innerHeight])
        .nice();

    //set x-axis
    const axisTickFormat = (number) => format('~s')(number);

    const xAxis = axisBottom(xScale)
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
    const yAxis = axisLeft(yScale)
        .tickFormat(axisTickFormat)
        .tickSize(-innerWidth)
        .tickPadding(10);

    

    
}