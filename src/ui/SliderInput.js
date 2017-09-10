import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slider, { Range } from 'rc-slider'
// We can just import Slider or Range to reduce bundle size
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css'
import Sounds from '../views/Sounds.js'
export default class SliderInput extends Component {

  delayEvent = _.debounce((e) => {
    console.log(e)
    this.props.onChange(e.target.value)
    // if(e.target.value > 0){
    //   console.log("yes")
    //   $('.react-audio-player').play()
    // }
  },200)

  handleChange = (e) => {
      e.persist()
      this.delayEvent(e)
  }

  render() {
    const { data, value } = this.props
    console.log(data)
    return (
      <label className="slider relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        {data.label}<br/>
        <input type="range" id={data.name} name={data.name} value={value} onChange={this.handleChange}   />
      </label>
    )
  }
}
