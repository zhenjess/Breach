//sort data by country and record count
//scale values and pass fill color to datamaps

function mapData(incidents, period) {
    if (!period) {
        let dataset = d3.nest()
            .key(function(d) {
                return d.victim.country[4];
            })
            .rollup(function(v) {
                return v.length;
            })
            .object(incidents.filter(function(d) {
                return d.timeline.incident.year === period
            }));

            let minValue = d3.min(d3.values(dataset));
            let maxValue = d3.max(d3.values(dataset));

            let colorScale = d3.scaleBand.log()
                .domain([minValue, maxValue])
                .range(['#e0ba3a', '#e07a3a']);

    }
}