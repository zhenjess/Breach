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

    
}