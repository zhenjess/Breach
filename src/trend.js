// import * as d3 from 'd3';

// function trendG(selection, props) {
//     const {
//         title,
//         margin,
//         data,
//         xValue,
//         xAxisLabel,
//         yValue,
//         yAxisLabel,
//         width,
//         height,
//         circleRadius
//     } = props;

//     let margin = { top: 10, right: 30, bottom: 30, left: 60 },
//         innerHeight = height - margin.top - margin.bottom,
//         innerWidth = width - margin.left - margin.right;

//     let svg = d3.select("#graph-container")
//         .append("svg")
//         .attr("height", innerHeight + margin.top + margin.bottom)
//         .attr("width", innerWidth + margin.left + margin.right)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
    
//     //Read the data
//     d3.csv("../data/breach_data.csv", function(data) {

//         // Add X axis
//         let xAxis = d3.scaleLinear()
//             .domain([2014, 2019])
//             .range([0, innerWidth]);
//         svg.append('g')
//             .attr("transform", "translate(0," + innerHeight + ")")
//             .call(d3.axisBottom(xAxis));

//         // Add Y axis
//         let yAxis = d3.scaleLinear()
//             .domain([0, 1200000000])
//             .range([innerHeight, 0]);
//         svg.append("g")
//             .call(d3.axisLeft(yAxis));

//         let tooltip = d3.select("#graph-container")
//             .append("div")
//             .style("opacity", 0)
//             .attr("class", "tooltip")
//             .style("background-color", "white")
//             .style("border", "solid")
//             .style("border-width", "1px")
//             .style("border-radius", "5px")
//             .style("padding", "10px");


//         // A function that change this tooltip when the user hover a point.
//         // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
//         let mouseover = function(d) {
//             tooltip
//                 .style("opacity", 1)
//         };

//         let mousemove = function(d) {
//             tooltip
//                 .html("Breach Data Records Lost: " + d.records)
//                 .style("left", (d3.mouse(this)[0] + 90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//                 .style("top", (d3.mouse(this)[1]) + "px")
//         };

//         // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
//         let mouseleave = function(d) {
//             tooltip
//                 .transition()
//                 .duration(200)
//                 .style("opacity", 0)
//         };

//         // Add dots
//         svg.append('g')
//             .selectAll("dot")
//             .data(data.filter(function(d, i) { return i < 50 })) // the .filter part is just to keep a few dots on the chart, not all of them
//             .enter()
//             .append("circle")
//             .attr("cx", function(d) { return x(d.year); })
//             .attr("cy", function(d) { return y(d.records; })
//             .attr("r", 10)
//             .style("fill", "#69b3a2")
//             .style("opacity", 0.3)
//             .style("stroke", "white")
//             .on("mouseover", mouseover)
//             .on("mousemove", mousemove)
//             .on("mouseleave", mouseleave)
//     })
// }

// export default trendG;


