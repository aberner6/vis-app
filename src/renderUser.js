import { select, selectAll } from 'd3-selection'
// import { scaleBand } from 'd3-scale'
// import { interpolateRgb } from 'd3-interpolate'
// import { range } from 'd3-array'
import { arc as d3Arc } from 'd3-shape'

export function renderUser(data) {

  return new Promise((resolve, reject) => {

    const svg = document.querySelector('#lines-grid')

    const w = window.innerWidth;
    const h = window.innerHeight;

    const dataArray = [
      data.Q1,
      data.Q2,
      data.Q3,
      data.Q4,
      data.Q5,
      data.Q6,
      data.Q7,
      data.Q8,
      data.Q9
    ]

    var marc = d3Arc()
    .innerRadius(180)
    .outerRadius(240)
    .startAngle(0)
    .endAngle(2*Math.PI)

    console.log(marc());


    const arcs = select(svg)
      .append('path')
        .style("fill", "#ddd")
        .attr("d", marc);

    // const circles = select(svg).selectAll('circle')
    //   .data(dataArray)
    //     .attr('r', function(d){
    //       return d
    //     })
    //
    // circles.enter()
    //   .insert('circle')
    //   .attr('r', function(d){
    //     return d.val
    //   })
    //   .attr('cx', function(d) {
    //     return w/2 - (d)
    //   })
    //   .attr('cy', function(d) {
    //     return h/2 - (d)
    //   })
    //   .attr('fill', '#ffffff')
    //   .merge(circles)
  })
}
