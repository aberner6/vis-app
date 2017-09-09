import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slider, { Range } from 'rc-slider'
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css'

export default class SliderInput extends Component {

  delayEvent = _.debounce((e) => {
    console.log(e)
    this.props.onChange(e.target.value)
  },200)

  handleChange = (e) => {
      e.persist()
      this.delayEvent(e)
  }

  render() {
    const { name, data, value } = this.props

    return (
      <label className="slider relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        <input type="range" id="slider" value={this.value} onChange={this.handleChange}   />
      </label>
    )
  }
}
