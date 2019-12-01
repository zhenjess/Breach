class Filter {
    constructor() {
        this.filterData();
    }

    filterData() {
        const tooltip = d3
            .select(`.header_tooltip`)
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '7px')
            .style('padding', '2rem');

        
    }
}

export default Filter;