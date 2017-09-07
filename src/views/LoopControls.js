import React, { Component } from 'react'

import { listenForLooping, setLooping } from '../api'

export default class LoopControls extends Component {
  constructor(props) {
    super(props)

    this.state = { looping: null }
  }

  componentDidMount() {
    listenForLooping((looping) => {
      this.setState({ looping })
    })
  }

  toggleLooping = (e) => {
    const looping = e.target.checked
    setLooping(looping)
  }

  render() {
    if (this.state.looping === null) {
      return <div className="h-100 tc flex flex-column justify-center">Loading...</div>
    }

    return (
      <div className="h-100 tc flex flex-column justify-center pt6 f4">
        <label>
          <input type="checkbox" checked={this.state.looping} onChange={this.toggleLooping}
            style={{
              transform: 'scale(12)',
              transformOrigin: 'center bottom',
            }}/>
          <div className="mt4-l">
            Enable looping<br/>through different sources
          </div>
        </label>
      </div>
    )
  }
}
