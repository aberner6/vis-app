import { select, selectAll } from 'd3-selection'
// import { scaleBand } from 'd3-scale'
// import { interpolateRgb } from 'd3-interpolate'
// import { range } from 'd3-array'
import { arc as d3Arc } from 'd3-shape'

function arc2Tween(d, indx) {
    var interp = d3.interpolate(this._current, d);    // this will return an interpolater
                                                      //  function that returns values
                                                      //  between 'this._current' and 'd'
                                                      //  given an input between 0 and 1

    this._current = d;                    // update this._current to match the new value

    return function(t) {                  // returns a function that attrTween calls with
                                          //  a time input between 0-1; 0 as the start time,
                                          //  and 1 being the end of the animation

      var tmp = interp(t);                // use the time to get an interpolated value
                                          //  (between this._current and d)

      return arcData(tmp, indx);          // pass this new information to the accessor
                                          //  function to calculate the path points.
                                          //  make sure sure you return this.

                                          // n.b. we need to manually pass along the
                                          //  index to drawArc so since the calculation of
                                          //  the radii depend on knowing the index. if your
                                          //  accessor function does not require knowing the
                                          //  index, you can omit this argument
    }
  };

export function renderUser(data) {

  return new Promise((resolve, reject) => {

    const svg = select(document.querySelector('#lines-grid'))

    const dimensions = svg.node().parentNode.getBoundingClientRect()

    const w = dimensions.width;
    const h = dimensions.height;

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

    const arcs = g.selectAll('path')
      .data(dataArray)
      .attr('d', arcData)

    arcs.enter()
        .insert('path')
        .attr('class', 'arc-path')
        .style("fill", "#ddd")
        .attr("d", arcData)
        .merge(arcs)

  })
}
