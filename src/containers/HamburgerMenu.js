import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'

@inject('currentUserState')
@observer
export default class HamburgerMenu extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  toggleOpen = (e) => {
    this.setState((prevState) => ({ open: !prevState.open }))
  }

  render() {
    const { surveyCompleted } = this.props.currentUserState

    return (
      <div className={`hamburger-menu fixed z-999 user-select-none ${this.state.open ? 'hamburger-menu--open' : ''}`}>
        <a onClick={this.toggleOpen} className="dib pointer pa3 pb2">
          <HamburgerClosedIcon className="hamburger-icon-closed absolute top-1 left-1"/>
          <HamburgerIcon className="hamburger-icon"/>
        </a>
        <HamburgerLink exact to="/" onClick={this.toggleOpen}>Visualized</HamburgerLink>
        <HamburgerLink to="/about" onClick={this.toggleOpen}>About</HamburgerLink>
        {!surveyCompleted &&
          <HamburgerLink to="/survey" onClick={this.toggleOpen}>Survey</HamburgerLink>
        }
      </div>
    )
  }
}

function HamburgerLink({ children, ...rest }) {
  return <NavLink {...rest} activeClassName="underline" className="hamburger-link db pointer f5 f4-l white pa1 ph3">{children}</NavLink>
}

function HamburgerIcon({ className }) {
  return (
    <svg width="25" height="25" x="0px" y="0px" viewBox="0 0 20 20" className={className}>
      <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" x1="0" y1="2" x2="20" y2="2"/>
      <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" x1="0" y1="10" x2="20" y2="10"/>
      <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" x1="0" y1="18" x2="20" y2="18"/>
    </svg>
  )
}
function HamburgerClosedIcon({ className }) {
  return (
    <svg width="25" height="25" x="0px" y="0px" viewBox="0 0 20 20" className={className}>
      <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" x1="1.8" y1="18.3" x2="18.2" y2="1.8"/>
      <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" x1="1.8" y1="1.8" x2="18.2" y2="18.3"/>
    </svg>
  )
}
