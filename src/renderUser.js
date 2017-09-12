import { select, selectAll } from 'd3-selection'
// import { scaleBand } from 'd3-scale'
// import { interpolateRgb } from 'd3-interpolate'
// import { range } from 'd3-array'
import { arc as d3Arc } from 'd3-shape'

export function renderUser(data) {

  return new Promise((resolve, reject) => {

    const svg = document.querySelector('#grid-container')

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

    const g = select(svg).attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

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

    // .innerRadius(function(d, i) {
    //   return  arcMin + i*(arcWidth) + arcPad;
    // })
    // .outerRadius(function(d, i) {
    //   return arcMin + (i+1)*(arcWidth);
    // })
    // .startAngle(0 * (PI/180))
    // .endAngle(function(d, i) {
    //   return Math.floor((d*6 * (PI/180))*1000)/1000;
    // });

    const arcs = g.selectAll('path')
      .data(dataArray)
      .attr('d', arcData)

    arcs.enter()
        .insert('path')
        .attr('class', 'arc-path')
        .style("fill", "#ddd")
        .attr("d", arcData)
        .merge(arcs)

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
