import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SurveyCard from '../containers/SurveyCard'
import UserLineFirebase from '../containers/UserLineFirebase'
import SurveyRecap from '../containers/SurveyRecap'
import AnimatedBackground from '../ui/AnimatedBackground'
import SliderInput from '../ui/SliderInput'
import Button from '../ui/Button'
import { IDENTITY, VALUES, COLLECTIVE } from '../CONSTANTS'

@inject('currentUserState')
@observer
export default class Survey extends Component {

  componentWillMount() {
    const currentUserState = this.props.currentUserState
    currentUserState.newUser()
  }

  componentWillUnmount() {
    const { surveyCompleted, emptySurveyData } = this.props.currentUserState

    if (!surveyCompleted) {
      emptySurveyData()
    }
  }

  submitSurvey = (e) => {
    this.props.currentUserState.surveyCompleted = true
  }

  render() {
    const currentUserState = this.props.currentUserState
    return (

      <div className={`survey flex h-100`}>


        {currentUserState.surveyCompletitionIndex >= 2 &&
          <ReactCSSTransitionGroup transitionName="size-in-down" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              <div className="survey-viz-results justify-center overflow-hidden survey-first-half">
                <UserLineFirebase userToViz={currentUserState.uID} />
              </div>
          </ReactCSSTransitionGroup>
        }

        <div className="survey-second-half flex-auto flex-auto-50 relative">

          <div className="absolute absolute--fill h-100 w-100">

            <ReactCSSTransitionGroup component="div" className={`h-100 flex flex-column justify-center items-center  overflow-scrolling-touch transition-slow will-change-transform`} transitionName="fade-in-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>

              {currentUserState.surveyCompletitionIndex === 0 &&
                <SurveyCard title="New Identity" button="Next" name="identity">
                  {
                    IDENTITY.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 1 &&
                <SurveyCard title="Values Selection" button="Next" name="values">
                  {
                    VALUES.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 2 &&
                <SurveyCard title="???" button="Next" name="collective">
                  {
                    COLLECTIVE.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 3 && !currentUserState.surveyCompleted &&
                <SurveyCard title="Thank you for your participation" button="Finish Survey" name="complete">
                </SurveyCard>
              }

              {currentUserState.surveyCompleted &&
                <SurveyCard title="Finished" name="completed">
                </SurveyCard>
              }

            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
