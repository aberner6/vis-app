import React, { Component } from 'react'

export default class Button extends Component {
  // TODO add proptypes here

  render() {
    const { children, className = '', ...rest } = this.props

    return (
      <button className={`button bg-transparent relative bg-transparent z-1 white ba b--white db pointer center fw4 f5 f4-l pa3 pl4 pr4 ${className}`} {...rest}>{children}</button>
    )
  }
}
