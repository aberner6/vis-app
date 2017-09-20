import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class SliderInput extends Component {

  delayEvent = _.debounce((e) => {
    this.props.onChange(e.target.name, e.target.value)
  }, 100)

  handleChange = (e) => {
    e.persist()
    this.delayEvent(e)
  }

  render() {
    const { data } = this.props
    return (
      <label className="slider relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        <span className="slider-label-second">{data.label1}</span>
        <input type="range" step={10} id={data.name} name={data.name} onChange={this.handleChange} />
        <span className="slider-label">{data.label2}</span>        
      </label>
    )
  }
}
