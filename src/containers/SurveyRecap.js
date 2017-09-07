import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('currentUserState')
@observer
export default class SurveyRecap extends Component {
  render() {
    const { className, currentUserState: { currentUserData }, ...rest } = this.props

    return (
      <div className={`tc cf ${className}`} {...rest}>
        {
          currentUserData.map((data, i) => (
            <div className="h1 fl truncate ph2 w-33" key={i}>{data}</div>
          ))
        }
      </div>
    )
  }
}
