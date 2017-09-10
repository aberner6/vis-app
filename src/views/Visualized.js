import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import UserLineFirebase from '../containers/UserLineFirebase'
import SurveyRecap from '../containers/SurveyRecap'
import { highlightElement } from '../renderChart'

import { trackMyLine } from '../api'

@inject('currentUserState')
@observer
export default class Visualized extends Component {

  render() {
    const { surveyCompleted } = this.props.currentUserState
    // currentUserColor
    return (
      <div className="flex flex-column h-100 tc user-select-none" onClick={surveyCompleted ? this.trackMe : null} >

        <div className="relative flex-auto flex ma4">
          <UserLineFirebase currentUser={true} />
        </div>

        {surveyCompleted &&
          <div>
            <div className="mw7 center pt3 pb4">
              <SurveyRecap/>
            </div>
          </div>
        }

      </div>
    )
  }
}
