import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'

export default class ModalSurvey extends Component {
  constructor(props) {
    super(props)

    this.state = { hidden: Boolean(localStorage.getItem('modalHidden')) }
  }

  hideModal = (e) => {
    e.preventDefault()

    try {
      localStorage.setItem('modalHidden', true)
    } catch (e) {}

    this.setState({ hidden: true })
  }

  render() {
    if (this.state.hidden) {
      return false
    }

    return (
      <div className="fixed absolute--fill bg-waterloo z-999 tc flex flex-column justify-center">
        <div className="pa4">
          <h3 className="mt0 f4 f3-l fw4">Welcome to Project Verso</h3>
          <p className="ttu fw1 f5 f4-l">Please take a few seconds<br/>to answer our survey</p>
          <Link to="/survey" className="no-underline dib mt4 mb4"><Button>OK</Button></Link>
          <br/>
          <a onClick={this.hideModal} className="fw1 f5 f4-l pointer underline-spaced">No, take me to the archive</a>
        </div>
      </div>
    )
  }
}
