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

        d3.selectAll('.location')
            .on('hoverOver', (d, i) => {
                let className;
                if (typeof d === 'string') {
                    className = `location-${d.split(' ').join('-')}`;
                } else if (d.data) {
                    className = d.data.class;
                } else {
                    className = d.class;
                }
                const allOtherLocations = document.querySelectorAll(`.location:not(.${className})`);
                allOtherLocations.forEach(data => {
                    data.classList.add('filter');
                })

                // tooltip  
                tooltip
                    .style("opacity", 1)
                    .style("stroke", "black")
                    .html(
                        `
                            <div class="tooltip__inner">
                                <p class="tooltip__city"><strong>Location: </strong><span>${
                                        d.location
                                        }</span></p>
                            </div>
                        `
                    );
                const mainHeader = document.querySelector('.main__header');
                mainHeader.setAttribute('style', `color: ${d.color}`);
            })
            .on('noHover', () => {
                const allLocationData = document.querySelectorAll('.location');
                allLocationData.forEach(data => {
                    data.classList.remove('filter');
                })

                const mainHeader = document.querySelector(".main__header");
                mainHeader.setAttribute("style", `color: initial`);
            })
    }
}

export default Filter;