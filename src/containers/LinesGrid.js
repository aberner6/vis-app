import React, { Component } from 'react'

import { renderChart } from '../renderChart'

import debounce from 'lodash/debounce'

function onResizeWindow(fn) {
  window.addEventListener('resize', fn)
  return () => window.removeEventListener('resize', fn)
}

export default class LinesGrid extends Component {
  // TODO add a  GLOBAL state that hides/shows the lines for the transaction

  componentDidMount() {
    const { data } = this.props

    // position the square so it's alwaysat the center
    this.positionSquare()
    this.positionResizeDisposer = onResizeWindow(debounce(this.positionSquare, 10))

    // do a first paint and then bind it on resize
    renderChart(data)
    this.resizeDisposer = onResizeWindow(debounce(() => renderChart(data), 200))
  }

  componentWillUnmount() {
    this.positionResizeDisposer()
    this.resizeDisposer()
  }

  positionSquare = () => {
    const height = this.linesGridContainer.parentNode.offsetHeight

    this.linesGridContainer.style.maxHeight = `${height}px`
    this.linesGridContainer.style.maxWidth = `${height}px`
  }

  render() {
    return (
      <svg id="lines-grid" ref={el => { this.linesGridContainer = el }}></svg>
    )
  }
}
