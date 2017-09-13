import { scaleBand } from 'd3-scale'
import { interpolate as d3Interpolate, interpolateRgb } from 'd3-interpolate'
import { range } from 'd3-array'
import { squareGetCoordinates, squareSpiralGetCoordinates, snakeGetCoordinates } from './dispositionFunctions'
import 'd3-transition'
import { select } from 'd3-selection'
// import { interpolate as d3Interpolate } from 'd3-interpolate'
import { arc as d3Arc } from 'd3-shape'

export function renderChart(data, delay = 0, firstRender = false, order = 'snake') {
  return new Promise((resolve, reject) => {
    console.log('drawing for data', data)
    const svg = document.querySelector('#lines-grid')
    const participantCount = data.length
    const cols = Math.ceil(Math.sqrt(participantCount))
    const rows = Math.ceil(participantCount / cols)
    const containerSize = svg.getBoundingClientRect() // TODO this is expensive, do it on resize debounced not every render
    console.log("containerSize", containerSize);
    const containerWidth = Math.min(containerSize.width, containerSize.height)
    const xRange = range(cols)
    const yRange = range(rows)
    const xScale = scaleBand()
      .domain(xRange)
      .range([0, containerWidth])
    const yScale = scaleBand()
      .domain(yRange)
      .range([0, containerWidth])

    const lineWidth = xScale.bandwidth()

    const calculatePosition = (d, i) => {
      const center = lineWidth / 2
      const [ x, y ] = do {
        squareGetCoordinates(i, cols)
      }
      return `translate(${xScale(x) + center} ${yScale(y) + center})`
    }

    const duration = 1000
    select(svg)
      .select('#grid-container')
      .transition()
      .duration(firstRender ? 0 : duration)
      .attr('transform', () => {
        const { width, height } = containerSize
        if (containerSize.width >= containerSize.height) {
          return `translate(${(width - height) / 2} 0)`
        } else {
          return `translate(0 ${(height - width) / 2})`
        }
      })

    const cells = select(svg)
      .select('#grid-container')
      .selectAll('g.cells')
      .data(data, d => d.id)

    const cellsExit = cells.exit()
      .transition().duration(duration)

    cellsExit.on('end', function () {
      select(this).remove()
    })

    const cellsEnter = cells.enter()
      .append('g')
      .classed('cells', true)
      .attr('transform', calculatePosition)

    var tau = 2 * Math.PI // http://tauday.com/tau-manifesto

    var arcMin = 10
    var arcWidth = 5
    var arcPad = 2

    var arcData = d3Arc()
    .innerRadius(function (d, i) {
      return arcMin + i * arcWidth + arcPad
    })
    .outerRadius(function (d, i) {
      return arcMin + (i + 1) * (arcWidth)
    })
    .startAngle(0 * (Math.PI/180))
    .endAngle(function (d, i) {
      return d / 100 * tau
    })

    function arc2Tween (d, indx) {
      var interp = d3Interpolate(this._current, d)
      this._current = d

      return function (t) {
        var tmp = interp(t)
        return arcData(tmp, indx)
      }
    }

    const arcs = cellsEnter.selectAll('path')
      .data(function (d) {
        const dataArray = [
          d.Q1,
          d.Q2,
          d.Q3,
          d.Q4,
          d.Q5,
          d.Q6,
          d.Q7,
          d.Q8,
          d.Q9,
          d.Q10,
        ]
        return dataArray
      })

    arcs.transition()
      .duration(300)
      .attrTween('d', arc2Tween)

    arcs.enter()
        .insert('path')
        .attr('class', 'arc-path')
        .style('fill', '#ddd')
        .attr('d', arcData)
        .merge(arcs)

  //   cellsEnter
  //     .append('rect')
  //     .attr('x', -lineWidth / 2)
  //     .attr('y', -lineWidth / 2)
  //     .attr('width', lineWidth)
  //     .attr('height', lineWidth)
  //     .style('stroke', 'transparent')
  //     .style('fill', 'transparent')
  //
  //   cellsEnter
  //     .append('line')
  //     .style('stroke', '#ffffff')//d => ETHNICITY.find(ethnicity => ethnicity.name === d.ethnicity).color)
  //     .style('stroke-width', strokeWidth)
  //     .attr('y1', 0)
  //     .attr('y2', 0)
  //     .attr('transform', d => {
  //       console.log(d)
  //       const rotation = 20 //GENDERS.find(gender => gender.name === d.gender).angle
  //       return `rotate(${rotation})`
  //     })
  //     .transition()
  //     .delay(delay)
  //     .duration(duration)
  //     .attr('x1', -lineWidth / 2)
  //     .attr('x2', lineWidth / 2)
  //     .on('end', resolve)
  //
  //   cells
  //     .transition().duration(duration)
  //     .delay(delay)
  //     .attr('transform', calculatePosition)
  //
  //   cells
  //     .selectAll('rect')
  //     .transition().duration(duration)
  //     .delay(delay)
  //     .attr('x', -lineWidth / 2)
  //     .attr('y', -lineWidth / 2)
  //     .attr('width', lineWidth)
  //     .attr('height', lineWidth)
  //
  //   cells
  //     .selectAll('line')
  //     .style('stroke-width', strokeWidth)
  //     .transition().duration(duration)
  //     .delay(delay)
  //     .attr('x1', -lineWidth / 2)
  //     .attr('x2', lineWidth / 2)
  //     .on('end', resolve)
  })
}

export function highlightElement(user) {
  return new Promise((resolve, reject) => {
  //   const svg = document.querySelector('#lines-grid')
  //   const selected = select(svg)
  //     .selectAll('g.cells')
  //     .filter(d => d.id === user.id)
  //   // const data = selected.data()[0]
  //   user.pulseFillLock = user.pulseFillLock || {}
  //   user.pulseStrokeLock = user.pulseStrokeLock || {}
  //   function pulseFill(path, duration) {
  //     select(user.pulseFillLock)
  //       .transition()
  //       .duration(duration)
  //       .tween('style:fill', function (d) {
  //         return function (t) { path.style('fill', interpolateRgb(path.style('fill'), color)(t)) }
  //       })
  //       .transition()
  //       .duration(duration)
  //       .tween('style:fill', function () {
  //         const i = interpolateRgb(color, 'transparent')
  //         return function (t) { path.style('fill', i(t)) }
  //       })
  //   }
  //   function pulseStroke(path, duration) {
  //     select(user.pulseStrokeLock)
  //       .transition()
  //       .duration(duration)
  //       .tween('style:stroke', function () {
  //         return function (t) { path.style('stroke', interpolateRgb(path.style('stroke'), '#030321')(t)) }
  //       })
  //       .transition()
  //       .duration(duration)
  //       .tween('style:stroke', function () {
  //         const i = interpolateRgb('#030321', color)
  //         return function (t) { path.style('stroke', i(t)) }
  //       })
  //   }
  //
  //   selected
  //     .select('rect')
  //     .call(pulseFill, 1000)
  //
  //   selected
  //     .select('line')
  //     .call(pulseStroke, 1000)
  })
}
