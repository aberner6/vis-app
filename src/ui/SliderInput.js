import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class SliderInput extends Component {

  delayEvent = _.debounce((e) => {
    console.log(e)
    this.props.onChange(e.target.name, e.target.value)
  }, 200)

  handleChange = (e) => {
    e.persist()
    this.delayEvent(e)
  }

  render() {
    const { data } = this.props
    console.log(data)
    return (
      <label className="slider relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        {data.label}<br/>
        <input type="range" id={data.name} name={data.name} onChange={this.handleChange} />
      </label>
    )
  }
}
