import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SurveyCard from '../containers/SurveyCard'
import UserLine from '../containers/UserLine'
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

      <div className={`survey ${currentUserState.surveyCompletitionIndex >= 2 ? 'survey-show-viz' : ''} flex h-100`}>

        <div className="survey-viz-results flex-auto flex-auto-50 flex flex-column justify-center overflow-hidden">
          <div className="w-50 center m-25">
            <UserLine/>
          </div>

          <SurveyRecap className={`dn-landscape f5 mt3 transition-standard transition-delay-big ${currentUserState.num === null ? '0' : ''}`}/>
        </div>


        <div className="survey-second-half flex-auto flex-auto-50 relative">
        <SurveyRecap className={`dn-landscape f5 mt3 transition-standard transition-delay-big ${currentUserState.num === null ? '0' : ''}`}/>

          <AnimatedBackground activeColor={currentUserState.currentUserColor} className={currentUserState.num === null ? 'survey-canvas-expanded' : ''}/>

          <SurveyRecap className={`dn-portrait w-60 absolute bb b--white-opacity ttu f6 f5-l pb2 transition-standard transition-delay-standard`} style={{ top: '10%', left: '20%' }}/>

          <div className="absolute absolute--fill h-100 w-100">

            <ReactCSSTransitionGroup component="div" className={`h-100 flex flex-column justify-center items-center  overflow-scrolling-touch transition-slow will-change-transform`} transitionName="fade-in-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>

              {currentUserState.surveyCompletitionIndex === 0 &&
                <SurveyCard title="Which number do you identify with?" button="Next" name="identity">
                  {
                    IDENTITY.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }
              {currentUserState.surveyCompletitionIndex === 1 &&
                <SurveyCard title="Which number do you identify with?" button="Next" name="values">
                  {
                    VALUES.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 2 &&
                <SurveyCard title="Which number do you identify with?" button="Next" name="collective">
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
