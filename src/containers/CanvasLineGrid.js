import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { fetchUsers, listenForNewUsers } from '../api'
import raf from 'raf'
import { snakeGetCoordinates } from '../dispositionFunctions'
import { scaleBand } from 'd3-scale'
import { range } from 'd3-array'
import { maxBy, sampleSize } from 'lodash'

@inject('allUsersState')
@observer
export default class CanvasLineGrid extends Component {
  static defaultProps = {
    trackUsers: false,
  }
  constructor(props) {
    super(props)

    this.state = {
      participantCount: true,
      cols: 0,
      rows: 0,
    }
  }

  componentDidMount() {
    const { allUsersState, trackUsers } = this.props

    const ctx = this.container.getContext('2d')

    fetchUsers()
      .then(users => {
        allUsersState.addUsers(users)
        this.updateGridConfiguration(users)
        const latest = maxBy(users, d => d.created)
        listenForNewUsers(latest.created + 1, user => {
          allUsersState.addUser(user)
          this.updateGridConfiguration(allUsersState.allUsersSorted)
        })


        console.log(this.participantCount)
      })
    const drawGrid = this.drawGrid

    const tick = () => {
      drawGrid(ctx, allUsersState.allUsersSorted)
      raf(tick)
    }
    this.rafHandle = raf(tick)
  }
  componentWillUnmount() {
    raf.cancel(this.handle)
  }
  shouldComponentUpdate() {
    return false
  }
  updateGridConfiguration = (users) => {
    const { clientWidth, clientHeight } = this.container.parentNode
    this.containerWidth = clientWidth < clientHeight ? clientWidth : clientHeight

    this.participantCount = users.length
    this.cols = Math.ceil(Math.sqrt(this.participantCount))
    this.rows = Math.ceil(this.participantCount / this.cols)
    const xRange = range(this.cols)
    const yRange = range(this.rows)
    const xScale = scaleBand()
      .domain(xRange)
      .range([0, this.containerWidth])
    const yScale = scaleBand()
      .domain(yRange)
      .range([0, this.containerWidth])

    this.lineWidth = xScale.bandwidth()
  }
  drawGrid = (ctx, users) => {
    ctx.clearRect(0,0,this.containerWidth,this.containerWidth)
    users.forEach((user,i) => this.drawLine(ctx, user , i))
  }

  drawLine = (ctx, participant, i) => {

    const [ x, y ] = snakeGetCoordinates(i, this.cols)
    ctx.strokeStyle = 'rgb(200, 0, 0)'
    ctx.rect(x*this.lineWidth, y*this.lineWidth, this.lineWidth, this.lineWidth)
    ctx.stroke()
  }


  render() {
    return (
      <canvas width={500} height={500} ref={el => { this.container = el }}>
      </canvas>
    )
  }
}
