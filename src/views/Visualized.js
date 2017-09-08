import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import LinesGridFirebase from '../containers/LinesGridFirebase'
import SurveyRecap from '../containers/SurveyRecap'
import ModalSurvey from '../ui/ModalSurvey'
import { highlightElement } from '../renderChart'

import { trackMyLine } from '../api'

@inject('currentUserState')
@observer
export default class Visualized extends Component {
  trackMe = () => {
    const { id, currentUserDataObject } = this.props.currentUserState
    trackMyLine(id)
    highlightElement(currentUserDataObject)
  }

  render() {
    const { surveyCompleted, currentUserColor } = this.props.currentUserState

    return (
      <div className="flex flex-column h-100 tc user-select-none" onClick={surveyCompleted ? this.trackMe : null} >

        <div className="relative flex-auto flex ma4">
          <LinesGridFirebase trackUsers={false} isStatic={false} currentUser={true} />
        </div>

        {surveyCompleted &&
          <div>
            <div className="mw7 center pt3 pb4">
              <SurveyRecap/>
            </div>
          </div>
        }

        {!surveyCompleted &&
          <Link className="ph3 pv4 f4 lh-copy pointer user-select-none" to="/survey">You can take part in the survey by clicking here</Link>
        }

        {surveyCompleted &&
          <div className="pa3 pv4 fw4 f4 lh-copy pointer user-select-none" style={{ background: currentUserColor }}>
            Now tap/click to track your line
          </div>
        }

      </div>
    )
  }
}
