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

    var arcMin = 1
    var arcWidth = 5
    var arcPad = 0

    var arcData = d3Arc()
    .innerRadius(function (d, i) {
      return arcMin + i * arcWidth + arcPad
    })
    .outerRadius(function (d, i) {
      return arcMin + (i + 1) * (arcWidth)
    })
    .startAngle(0 * (Math.PI/180))
    .endAngle(function (d, i) {
      return d/100 * Math.PI
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

    function parseDataArray(d) {
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
    }

    const arcColorCode = [
      '#FF0090',
      '#FF52B4',
      '#ee2a7b',
      '#A361FF',
      '#6C02FF',
      '#5D3299',
      '#FF8652',
      '#ff4949',
      '#FF4C00',
      '#FFF',
    ]

    select(svg)
      .select('#grid-container')
      .transition()
      .duration(firstRender ? 0 : 1000)
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

    cells.transition()
        .duration(300)
        .attr('transform', calculatePosition)


    const cellsExit = cells.exit().remove()

    const cellsEnter = cells.enter()
      .append('g')
      .classed('cells', true)
      .attr('id', function(d) {
        return d.id
      })
      .attr('transform', calculatePosition)

    const arcsRight = cells.selectAll('path.arcRight')
      .data(function(d) {
        return parseDataArray(d)
      })
      .transition()
      .duration(300)
      .style('opacity', function(d){
        var op = (d == 50) ? '0.5' : '1'
        return op
      })
      .attrTween('d', arc2Tween)

    const arcsRightEnter = cellsEnter.selectAll('path.arcRight')
      .data(function(d) {
        return parseDataArray(d)
      })
      .enter()
      .insert('path')
      .attr('class', 'arcRight')
      .style("fill", function(d, i) {
        return arcColorCode[i]
      })
      .style('opacity', function(d){
        var op = (d == 50) ? '0.5' : '1'
        return op
      })
      .attr("d", arcData)
      .merge(arcsRight)

    const arcsLeft = cells.selectAll('path.arcLeft')
      .data(function() {
        const dataInverse = []
        for (var i = 0; i < dataArray.length; i++) {
          dataInverse[i] = 100 - dataArray[i]
        }
        return dataInverse
      })
      .transition()
      .duration(300)
      .style('opacity', function(d){
        var op = (d == 50) ? '0.5' : '1'
        return op
      })
      .attrTween('d', arc2Tween)

    const arcsLeftEnter = cellsEnter.selectAll('path.arcLeft')
      .data(function(d) {
        return parseDataArray(d)
      })
      .enter()
      .insert('path')
      .attr('class', 'arcLeft')
      .style("fill", function(d, i) {
        return arcColorCode[i]
      })
      .style('opacity', function(d){
        var op = (d == 50) ? '0.5' : '1'
        return op
      })
      .attr('transform', 'rotate(180)')
      .attr("d", arcData)
      .merge(arcsLeft)

    var spacer = 5
    const circs = cellsEnter.selectAll('circle')
      .data(function(d) {
        return parseDataArray(d)
      })
      .enter()
      .insert('circle')
      .attr('class','circ')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', function(d,i){
        return arcMin + (i+1)*spacer
      })
      .style("fill","none")
      .style("stroke","grey")
      .style("stroke-width",2)
      .style('opacity', '0.25')

  })
}

export function highlightElement(user) {
  console.log('TRACKING', user);
  return new Promise((resolve, reject) => {

    const svg = document.querySelector('#lines-grid')

    const cellsToHighlight = select(svg).selectAll('g.cells')
      .data([user])
      .insert('circle')
      .attr('r', 200)
      .attr('fill', '#FFFFFF')

    const removeHighlight = cellsToHighlight.exit()
      .select('circle').remove()

    const newHighlight = cellsToHighlight.enter()
      .insert('circle')
      .attr('fill', '#FFFF00')

    // const selected = select(svg)
    //   .selectAll('g.cells')
    //   .filter(d => d.id === user.id)
    // // const data = selected.data()[0]
    // user.pulseFillLock = user.pulseFillLock || {}
    // user.pulseStrokeLock = user.pulseStrokeLock || {}
    // function pulseFill(path, duration) {
    //   select(user.pulseFillLock)
    //     .transition()
    //     .duration(duration)
    //     .tween('style:fill', function (d) {
    //       return function (t) { path.style('fill', interpolateRgb(path.style('fill'), color)(t)) }
    //     })
    //     .transition()
    //     .duration(duration)
    //     .tween('style:fill', function () {
    //       const i = interpolateRgb(color, 'transparent')
    //       return function (t) { path.style('fill', i(t)) }
    //     })
    // }
    // function pulseStroke(path, duration) {
    //   select(user.pulseStrokeLock)
    //     .transition()
    //     .duration(duration)
    //     .tween('style:stroke', function () {
    //       return function (t) { path.style('stroke', interpolateRgb(path.style('stroke'), '#030321')(t)) }
    //     })
    //     .transition()
    //     .duration(duration)
    //     .tween('style:stroke', function () {
    //       const i = interpolateRgb('#030321', color)
    //       return function (t) { path.style('stroke', i(t)) }
    //     })
    // }
    //
    // selected
    //   .select('rect')
    //   .call(pulseFill, 1000)
    //
    // selected
    //   .select('line')
    //   .call(pulseStroke, 1000)
  })
}
