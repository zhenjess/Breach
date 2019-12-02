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

        //render graph
        this.graph
            .selectAll('circle')
            .data(Object.values(this.data))
            .enter()
            .append('circle')
            .attr(
                'class', 
                d => 
                `country ${d.class} continent-${d.continent.split('').join('-')} country-bubble`
            )
            .attr('fill', d => {
                if (d.continent === 'Africa') {
                    return '#ff5b44';
                } else if (d.continent === 'Asia') {
                    return '#ff1f5a';
                } else if (d.continent === 'Europe') {
                    return '#2fc5cc';
                } else if (d.continent === 'North America') {
                    return '#7cbd1e';
                } else if (d.continent === 'South America') {
                    return '#303481';
                } else {
                    return '#5d3081';
                }
            })
            .attr('opacity', '0.8')
            .attr('stroke', '#CDCDCD')
            .attr('stroke-width', '2px')
            .attr('cx', d => {
                return this.xScale(d[metric] / 156) + 25;
            })
            .on('hoverOver', showTooltip)
            .on('hoverOn', moveToolTip)
            .on('noHover', hideToolTip)
            .transition()
            .delay((d, i) => i * ANIMATION_DELAY)
            .duration(ANIMATION_DURATION)
            .ease(ANIMATION_EASING)
            .attr('r', d => {
                if (d.records > 100000000) {
                    return d.records / 25000000;
                } else if (d.records > 1000000) {
                    return d.records / 1500000;
                } else {
                    return d.records / 100000;
                }
            });
        //legend
        let continents = {
            AFRICA: { continents: 'Africa' },
            ASIA: { continents: 'Asia' },
            EUROPE: { continents: 'Europe' },
            NORTH_AMERICA: { continents: 'North America' },
            SOUTH_AMERICA: { continents: 'South America' }
        };

        let continentsFocusOn = continentName => {
            this.graph
                .selectAll(
                    `circle:not(.continent-${continentName.split('').join('-')})`
                )
                .attr('opacity', '0.1');
        };

        let continentsFocusOff = continentName => {
            this.graph
                .selectAll(
                    `circle:not(.continent-${continentName.split('').join('-')})`
                )
                .attr('opacity', '0.8');
        };
    }
}