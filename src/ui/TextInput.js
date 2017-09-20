import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class TextInput extends Component {

  render() {
    const { data } = this.props
    return (
      <label className="slider relative db tc ttu fw4 f6 f5-l pa2 pa3-l pr3 pl3 truncate pointer bg-transparent z-1 user-select-none">
        <input type="text" name ="email">  
      </label>
    )
  }
}
