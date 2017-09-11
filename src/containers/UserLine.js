import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { ETHNICITY } from '../CONSTANTS'

@inject('currentUserState')
@observer
export default class UserLine extends Component {
  constructor(props) {
    super(props)

    this.state = { scale: 0 }
  }

  render() {
    const { currentUserColor, currentUserAngle, gender } = this.props.currentUserState
    const angle = currentUserAngle || 0

    // SHAME this is the worst ndrocchio I have done in js.... but it works!!
    // sorry future mantainer
    if (this.state.scale === 0 && gender !== null) {
      setTimeout(() => {
        this.setState({ scale: 1 })
      }, 1000)
    } else {
      this.scale = gender === null ? 0 : 1
    }

    const transform = `rotate(${angle}deg) scaleX(${this.state.scale || this.scale}) translateZ(0)`

    return (
      <div className="relative transition-standard" style={{ height: '5px', transform, WebkitTransform: transform }}>
        <div className="absolute absolute--fill bg-white"></div>
        {
          ETHNICITY.map((el, i) => (
            <div key={i} className={`ethnicity-color absolute absolute--fill ${currentUserColor === el.color ? 'active' : ''}`} style={{ backgroundColor: el.color }}></div>
          ))
        }
      </div>
    )
  }
}
