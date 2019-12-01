import {
    HEIGHT, 
    WIDTH, 
    MARGINS
} from './constants';

class Graph {
    constructor(selector, options) {
        this.setGraph(selector, options);
        this.setLabels();
    }

    setGraph(selector, options = { topOffset: 0, leftOffset: 0 }) {
        const svg = d3
            .select(selector)
            .attr("height", HEIGHT + MARGINS * 2)
            .attr("width", WIDTH + MARGINS * 2)

        this.graph = svg
            .append("g")
            .attr("position", "relative")
            .attr("class", "main_svg")
            .attr("transform", `translate(${MARGINS + options.leftOffset}, 
                ${(MARGINS / 2) +  options.topOffset})`);
    }

    setData(data) {
        this.data = data;
    }

    xAxis(ticks = 12, tickFormat = () => {}) {
        this.xScale = d3
            .scaleLinear()
            .range([0, WIDTH])
        let xAxisCall = d3
            .axisBottom(this.xScale)
            .ticks(ticks)
            .tickFormat(d3.format("2014"));
        this.graph
            .append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(xAxisCall);
    }

    yAxis(domain, yScale, ticks = 1000, tickFormat = () => {}) {
        if (yScale === "scaleBand") {
            this.yScale = d3[yScale]()
                .domain(domain)
                .range([0, HEIGHT])
                .padding(0.75);
        } else {
            this.yScale = d3[yScale]()
                .domain(domain)
                .range([0, HEIGHT]);
        }

        this.graph.append("g").call(
            d3
                .axisLeft(this.yScale)
                .ticks(ticks)
                .tickFormat(tickFormat())
        );
    }

    setLabels() {
        //Labels
        let xLabel = this.graph 
            .append("g")
            .append("text")
            .attr("class", "x-axis-label")
            .attr("y", HEIGHT + 50)
            .attr("x", WIDTH / 2)
            .attr("font-size", "20px")
            .attr("font-weight", "500")
            .attr("text-anchor", "middle")
            .text("Year");

        let yLabel = this.graph
            .append("g")
            .attr("class", "y-axis-label")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(HEIGHT / 2))
            .attr("y", -50)
            .attr("font-size", "20px")
            .attr("font-weight", "500")
            .attr("text-anchor", "middle")
            .text("Breach Record Losses");
    }
}

export default Graph;