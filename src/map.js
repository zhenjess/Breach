import {
    HEIGHT, 
    WIDTH,
    ANIMATION_DELAY, 
    ANIMATION_EASING, 
    ANIMATION_DURATION
} from './constants';

import Graph from './graph';

class Map extends Graph {
    constructor(selector) {
        super(selector);
        this.svg = d3.select(selector);
        this.xAxis();
        this.yAxis([1, 0], 'scaleLinear', 20, () => d3.format('1000'));
        this.getData("graphBreach");
    }

    getData(metric) {
        let that = this;
        d3.json('dist/data/countries.json').then(data => {
            that.setData(data);
            that.circles(metric);
        });
    }

    circles(metric) {
        //tooltip

        let tooltip = d3
            .select('body')
            .append('div')
            .style('visibility', 'hidden')
            .attr('class', 'tooltip')
            .style('background-color', 'black')
            .style('border-radius', '5px')
            .style('padding', '10px')
            .style('color', 'white')
            .style('z-index', '999999999')
            .style('position', 'absolute')
            .style('display', 'block')
        
        let that = this;
        let showToolTip = function(d) {
            tooltip.transition().duration(300);
            tooltip
                .style('visibility', 'visible')
                .html(
                    `
                    <strong>Country:</strong>${d.country} (${d.continent})<br/>
                    `
                )
                .style('top', d3.event.clientY - 100 + 'px')
                .style('left', d3.event.clientX - 150 + 'px');
        };

        let moveToolTip = function(d) {
            showToolTip(d);
            tooltip
                .style('top', d3.event.clientY - 100 + 'px')
                .style('left', d3.event.clientX - 150 + 'px');
        };

        let hideToolTip = function(d) {
            tooltip
                .transition()
                .duration(300)
                .style('visibility', 'hidden');
        };

        
    }
}