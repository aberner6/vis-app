import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Button from '../ui/Button'

@inject('currentUserState')
@observer
export default class SurveyCard extends Component {
  // TODO add proptypes here

  hadnleSubmit = (e) => {
    const { validateOnSubmit } = this.props
    const { nextSurveyQuestion } = this.props.currentUserState

    e.preventDefault()

    if (validateOnSubmit === null) {
      console.log("no")
      return 
    }

    nextSurveyQuestion()
  }

  render() {
    const { title, children, className = '', validateOnSubmit } = this.props

    return (
      <div
        className={`f6 flex flex-column survey-card ${className}`}>
        <h3 className="tc f5 f4-l fw4">{title}</h3>
        <form onSubmit={this.hadnleSubmit}>
          <div className="pt1 pb1 pt3-l pb3-l">
            {children}
          </div>
          <Button type="submit" className={`mt3 mb3 transition-standard ${validateOnSubmit === null ? '0' : ''}`}>OK</Button>
        </form>
      </div>
    )
  }
}
