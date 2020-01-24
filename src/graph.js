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
    
}