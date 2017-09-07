import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slider, { Range } from 'rc-slider'
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css'

export default class SliderInput extends Component {
  // TODO add proptypes here
  // updateSliderValue(e){
  handleChange = (e) => {
      console.log(e.target.value)
        // console.log(($slider).val())
      this.props.onChange(e.target.value)
    // this.props.onChange(e.target.value)
  }

  render() {
    const { name, data, value } = this.props

    return (
// <input type="range" **defaultValue="10" name="answer"** id="slider" min="10" max="200" onload="updateSliderValue(this.value)" onchange="updateSliderValue(this.value)"   />
        // <input className="dn" type="range" id="slider" name={name} value={this.value} onChange={this.updateSliderValue}/>

      <label className="slider relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        <input type="range" id="slider" value={this.value} onChange={this.handleChange}   />
        <div>
          <Slider />
          // <Range />
        </div>
      </label>
    )
  }
}
