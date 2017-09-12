import { select, selectAll } from 'd3-selection'
// import { scaleBand } from 'd3-scale'
import { interpolate as d3Interpolate } from 'd3-interpolate'
// import { range } from 'd3-array'
import { arc as d3Arc } from 'd3-shape'

export function renderUser(data) {

  return new Promise((resolve, reject) => {

    const svg = select(document.querySelector('#lines-grid'))

    const dimensions = svg.node().parentNode.getBoundingClientRect()

    const w = dimensions.width;
    const h = 340; //dimensions.height;

    svg
      .style('height', h)
      .style('width', w)

    const dataArray = [
      data.Q1,
      data.Q2,
      data.Q3,
      data.Q4,
      data.Q5,
      data.Q6,
      data.Q7,
      data.Q8,
      data.Q9,
      data.Q10
    ]

    const g = svg.select('#grid-container').attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

    var arcData = d3Arc()
    .innerRadius(function(d,i) {
      return 20 + i * 5 + 2
    })
    .outerRadius(function(d,i) {
      return 20 + (i+1)*(5)
    })
    .startAngle(0 * (Math.PI/180))
    .endAngle(function(d,i) {
      return d/100 * tau
    })

    function arc2Tween(d, indx) {
      var interp = d3Interpolate(this._current, d)
      this._current = d

      return function(t) {
        var tmp = interp(t)
        return arcData(tmp, indx)
      }
    }

    const arcs = g.selectAll('path')
      .data(dataArray)

    arcs.transition()
      .duration(300)
      .attrTween('d', arc2Tween)

    arcs.enter()
        .insert('path')
        .attr('class', 'arc-path')
        .style("fill", "#ddd")
        .attr("d", arcData)
        .merge(arcs)

  })
}
