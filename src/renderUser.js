import { select } from 'd3-selection'
import { scaleBand } from 'd3-scale'
import { interpolateRgb } from 'd3-interpolate'
import { ETHNICITY, GENDERS } from './CONSTANTS'
import { range } from 'd3-array'
import { squareGetCoordinates, squareSpiralGetCoordinates, snakeGetCoordinates } from './dispositionFunctions'
import 'd3-transition'

export function renderUser(data, delay = 0, firstRender = false, order = 'snake') {
  return new Promise((resolve, reject) => {
    const svg = document.querySelector('#lines-grid')
    const participantCount = data.length
    const cols = Math.ceil(Math.sqrt(participantCount))
    const rows = Math.ceil(participantCount / cols)
    const containerSize = svg.getBoundingClientRect() // TODO this is expensive, do it on resize debounced not every render
    const containerWidth = Math.min(containerSize.width, containerSize.height)
    const xRange = order === 'spiral' ? range(-Math.floor(cols / 2), Math.floor(cols / 2)) : range(cols)
    const yRange = order === 'spiral' ? range(-Math.floor(rows / 2), Math.floor(rows / 2)) : range(rows)
    const xScale = scaleBand()
      .domain(xRange)
      .range([0, containerWidth])
    const yScale = scaleBand()
      .domain(yRange)
      .range([0, containerWidth])

    const lineWidth = xScale.bandwidth()
    let strokeWidth = cols > 4 ? 2 : 3
    strokeWidth = (window.innerWidth < 500) && (cols > 8) ? 1 : strokeWidth

    const calculatePosition = (d, i) => {
      const center = lineWidth / 2
      const [ x, y ] = do {
        if (order === 'square') {
          squareGetCoordinates(i, cols)
        } else if (order === 'spiral') {
          squareSpiralGetCoordinates(cols ** 2 - i)
        } else if (order === 'snake') {
          snakeGetCoordinates(i, cols)
        }
      }
      return `translate(${xScale(x) + center} ${yScale(y) + center})`
    }

    const duration = 1000
    strokeWidth = lineWidth > 8 ? strokeWidth : 1
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

    cellsExit.selectAll('line')
      .attr('x1', 0)
      .attr('x2', 0)

    cellsExit.on('end', function () {
      select(this).remove()
    })

    const cellsEnter = cells.enter()
      .append('g')
      .classed('cells', true)
      .attr('transform', calculatePosition)

    cellsEnter
      .append('rect')
      .attr('x', -lineWidth / 2)
      .attr('y', -lineWidth / 2)
      .attr('width', lineWidth)
      .attr('height', lineWidth)
      .style('stroke', 'transparent')
      .style('fill', 'transparent')

    cellsEnter
      .append('line')
      .style('stroke', '#FFFFFF')
      .style('stroke-width', strokeWidth)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('transform', d => {
        const rotation = 20
        return `rotate(${rotation})`
      })
      .transition()
      .delay(delay)
      .duration(duration)
      .attr('x1', -lineWidth / 2)
      .attr('x2', lineWidth / 2)
      .on('end', resolve)

    cells
      .transition().duration(duration)
      .delay(delay)
      .attr('transform', calculatePosition)

    cells
      .selectAll('rect')
      .transition().duration(duration)
      .delay(delay)
      .attr('x', -lineWidth / 2)
      .attr('y', -lineWidth / 2)
      .attr('width', lineWidth)
      .attr('height', lineWidth)

    cells
      .selectAll('line')
      .style('stroke-width', strokeWidth)
      .transition().duration(duration)
      .delay(delay)
      .attr('x1', -lineWidth / 2)
      .attr('x2', lineWidth / 2)
      .on('end', resolve)
  })
}
