import React, { Component } from 'react'
import raf from 'raf'

export default class AnimatedBackground extends Component {
  componentDidMount() {
    const { activeColor } = this.props
    this.animationsContainer = []

    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight

    this.ctx.fillStyle = activeColor
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.rafHandle = raf(this.update)
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.activeColor !== this.props.activeColor) || (nextProps.className !== this.props.className)
  }

  componentDidUpdate() {
    const { activeColor } = this.props

    const animation = {
      progress: 1,
      color: activeColor,
    }
    this.animationsContainer.push(animation)

    const themeColorMeta = document.querySelector('[name="theme-color"]')
    themeColorMeta.setAttribute('content', activeColor)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafHandle)
  }

  update = () => {
    if (this.animationEnded) {
      const dead = this.animationsContainer.shift()
      this.ctx.fillStyle = dead.color
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    this.animationEnded = false

    this.animationsContainer.forEach((animation) => {
      animation.progress -= animation.progress / 8
      this.drawRectangle(animation)

      if (animation.progress < 0.001) {
        console.log('ANIMATIONEND')
        this.animationEnded = true
      }
    })

    raf(this.update)
  }

  drawRectangle({ progress: percentage, color }) { // percentage starting from 1 down to 0
    const startX = percentage * this.canvas.width
    const startY = percentage * this.canvas.height

    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(this.canvas.width, 0)
    this.ctx.lineTo(this.canvas.width, this.canvas.height)
    this.ctx.lineTo(0, this.canvas.height)
    this.ctx.fillStyle = color
    this.ctx.fill()
    this.ctx.closePath()
  }

  render() {
    return (
      <canvas className={`absolute absolute--fill w-100 h-100 z--1 transition-slow transition-delay-small ${this.props.className}`} ref={(el) => { this.canvas = el }}></canvas>
    )
  }
}
