import React, { Component } from 'react'

export default class ForgetSurvey extends Component {
  forgetSurvey = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  render() {
    return (
      <div className="h-100 tc flex flex-column justify-center items-center">
        <button onClick={this.forgetSurvey} className="pv3 ph4 fw4 pointer"
          style={{
            fontSize: '8vw',
          }}>
          DIMENTICA<br/>SONDAGGIO
        </button>
      </div>
    )
  }
}
