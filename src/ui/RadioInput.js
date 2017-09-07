import React, { Component } from 'react'

export default class RadioInput extends Component {
  // TODO add proptypes here

  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { name, data, value } = this.props

    return (
      <label className="radio-input relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        <input className="dn" type="radio" name={name} value={data.name} checked={value === data.name} onChange={this.handleChange}/>
        <div className="active-bg absolute absolute--fill bg-black z--1"></div>
        {data.name}
      </label>
    )
  }
}
