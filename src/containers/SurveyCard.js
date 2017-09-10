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
    if (this.props.name == "complete") {
      this.props.currentUserState.completeSurvey()
    } else {
      nextSurveyQuestion()
    }
  }

  render() {
    const { name, title, children, button, className = '', validateOnSubmit } = this.props

    return (
      <div
        className={`f6 flex flex-column survey-card ${className}`}>
        <h3 className="tc f5 f4-l fw4">{title}</h3>
        <form onSubmit={this.hadnleSubmit} name={name}>
          <div className="pt1 pb1 pt3-l pb3-l">
            {children}
          </div>
          <Button type="submit" className={`mt3 mb3 transition-standard ${validateOnSubmit === null ? '0' : ''}`}>{button}</Button>
        </form>
      </div>
    )
  }
}
