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

    formatOrdinal(num) {
        const int = parseInt(num),
            digits = [int % 100, int % 1000],
            ordinals = ['st', 'nd', 'rd', 'th'],
            oPattern = [1, 2, 3, 4], 
            tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
        return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
            ? int + ordinals[digits[0] - 1]
            : int + ordinals[3];
    };

    circles(metric) {
        //tooltip
        
    }
}