import React, { Component } from 'react'

export default class DateInput extends Component {
  // TODO add proptypes here
  constructor(props) {
    super(props)

    this.state = { birthYear: '' }
  }

  handleChange = (e) => {
    if (e.target.value === '') {
      this.setState({ birthYear: '' })
    }

    const birthYear = parseInt(e.target.value)

    // don't set yet the date while the user is typing
    if (birthYear < 1900) {
      this.props.onChange(null)
      this.setState({ birthYear })
      return
    }

    // if it's invalid or more than 4 digits don't do anything
    if (isNaN(birthYear) || birthYear > new Date().getFullYear()) {
      return
    }

    const age = new Date().getFullYear() - birthYear

    this.setState({ birthYear })
    this.props.onChange(age)
  }

  render() {
    const { name } = this.props

    return (
      <div>
        <input type="number" name={name} value={this.state.birthYear} onChange={this.handleChange} placeholder="TYPE THE YEAR" className="bg-transparent white db w-70 w-90-l tc center b--white bt-0 br-0 bl-0 bb f4 pt2 pb2 outline-0"/>
      </div>
    )
  }
}
