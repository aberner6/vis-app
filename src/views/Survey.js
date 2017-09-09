import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import SurveyCard from '../containers/SurveyCard'
// import UserLine from '../containers/UserLine'
import SurveyRecap from '../containers/SurveyRecap'
import AnimatedBackground from '../ui/AnimatedBackground'
import RadioInput from '../ui/RadioInput'
import SliderInput from '../ui/SliderInput'
import YearInput from '../ui/YearInput'
import Button from '../ui/Button'
import { Q1, ETHNICITY, GENDERS } from '../CONSTANTS'
import { saveUser, newUser } from '../api'

@inject('currentUserState')
@observer
export default class Survey extends Component {

  componentWillMount() {
    const currentUserState = this.props.currentUserState
    if (!currentUserState.surveyCompleted) {
      currentUserState.uID = newUser()
      console.log(currentUserState.uID)
    }
  }

  componentWillUnmount() {
    const { surveyCompleted, emptySurveyData } = this.props.currentUserState

    if (!surveyCompleted) {
      emptySurveyData()
    }
  }

  submitSurvey = (e) => {
    completeSurvey()
  }

  render() {
    const currentUserState = this.props.currentUserState
    return (
      <div className="survey flex h-100">

        <div className="survey-second-half flex-auto flex-auto-50 relative">
        <SurveyRecap className={`dn-landscape f5 mt3 transition-standard transition-delay-big ${currentUserState.num === null ? '0' : ''}`}/>

          <AnimatedBackground activeColor={currentUserState.currentUserColor} className={currentUserState.num === null ? 'survey-canvas-expanded' : ''}/>

          <SurveyRecap className={`dn-portrait w-60 absolute bb b--white-opacity ttu f6 f5-l pb2 transition-standard transition-delay-standard`} style={{ top: '10%', left: '20%' }}/>

          <div className="absolute absolute--fill h-100 w-100">

            <ReactCSSTransitionGroup component="div" className={`h-100 flex flex-column justify-center items-center  overflow-scrolling-touch transition-slow will-change-transform`} transitionName="fade-in-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>

              {currentUserState.surveyCompletitionIndex === 0 &&
                <SurveyCard title="Which number do you identify with?" validateOnSubmit={currentUserState.num} key="0">
                  {
                    Q1.map((el, i) => (
                      <SliderInput key={i} name="num" data={el} value={currentUserState.num} onChange={currentUserState.updateNum}/>
                    ))
                  }
                </SurveyCard>
              }
              {currentUserState.surveyCompletitionIndex === 1 &&
                <SurveyCard title="Which gender do you identify with?" validateOnSubmit={currentUserState.gender} key="1">
                  {
                    GENDERS.map((el, i) => (
                      <RadioInput key={i} name="gender" data={el} value={currentUserState.gender} onChange={currentUserState.updateGender}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 2 &&
                <SurveyCard title="Which ethnic group do you belong to?" validateOnSubmit={currentUserState.ethnicity} key="2">
                  {
                    ETHNICITY.map((el, i) => (
                      <RadioInput key={i} name="ethnicity" data={el} value={currentUserState.ethnicity} onChange={currentUserState.updateEthnicity}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 3 &&
                <SurveyCard title="When where you born?" validateOnSubmit={currentUserState.age} key="3">
                  <YearInput name="age" value={currentUserState.age} onChange={currentUserState.updateAge}/>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 4 &&
                <div key="4">
                  <h3 className="tc f5 f4-l fw4">Thank you for your participation</h3>
                  <Button onClick={this.submitSurvey}>ADD YOURSELF</Button>
                </div>
              }

              {currentUserState.surveyCompleted &&
                <div key="finished">
                  <h3>Finished</h3>
                </div>
              }

            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
