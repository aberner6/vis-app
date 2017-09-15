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
      var currentVal = (!this._current) ? 0 : this._current
      var interp = d3Interpolate(currentVal, d)
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


    //hello matt, i am being evil and inserting audio
    //into your beautiful arcs
    //these elements are loaded in the index.html (public) file
    //seems to be the best / easiest way so far
    //if it's wrong, we find a different way
    //yes, i know it's complete hacky
    var a = document.getElementById("audio1")
    var b = document.getElementById("audio2")
    var c = document.getElementById("audio3")

    //have to find a way to make it so the active slider
    //is the one triggering audio?

    //and if slider is inactive, it goes down to pause
    //or to experiment with: a low murmur for example
    //https://www.w3schools.com/jsref/dom_obj_audio.asp

    //could there be a way that we know that we are in the "values" zone
    //not sure where this is in the data :)
    //clearly i operate only on if statements

    if(data.Q7>0 && data.Q7<40){
      a.play()
      b.pause()
      c.pause()
      //OR a.volume = 0.2
    }
    if(data.Q7>40 && data.Q7<80){
      a.pause()
      b.play()
      c.pause()
    }
    if(data.Q7>80 && data.Q7<=100){
      a.pause()
      b.pause()
      c.play()
    }
    //continue with q8, q9?
    //i know, it's crappy-sketchy
    // if(data.Q9>10){
    //   b.pause()
    //   c.play()
    // }

  })
}
