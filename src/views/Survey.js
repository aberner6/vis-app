import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import SurveyCard from '../containers/SurveyCard'
import UserLineFirebase from '../containers/UserLineFirebase'
import SliderInput from '../ui/SliderInput'
import Button from '../ui/Button'
import { IDENTITY, VALUES, COLLECTIVE } from '../CONSTANTS'
import { trackMyLine } from '../api'

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

  highlightUser = (e) => {
    console.log('showing user', this.props.currentUserState.uID)
    trackMyLine(this.props.currentUserState.uID)
  }

  render() {
    const currentUserState = this.props.currentUserState
    return (

      <div className={`survey flex h-100`}>


        <ReactCSSTransitionGroup transitionName="size-in-down" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <div className="survey-viz-results justify-center overflow-hidden survey-first-half">
              <UserLineFirebase userToViz={currentUserState.uID} />
            </div>
        </ReactCSSTransitionGroup>

        <div className="survey-second-half flex-auto flex-auto-50 relative">

          <div className="absolute absolute--fill h-100 w-100">

            <ReactCSSTransitionGroup component="div" className={`h-100 flex flex-column justify-center items-center  overflow-scrolling-touch transition-slow will-change-transform`} transitionName="fade-in-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>

              {currentUserState.surveyCompletitionIndex === 0 &&
                <SurveyCard title="You are now ready to enter the New Europe" button="Enter Phase 1" name="survey">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 1 &&
                <SurveyCard title="Listen" button="Next" name="survey">
                  <p>After you hear the audio press next</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 2 &&
                <SurveyCard title="You are ready to experiment with your identity" button="Next" name="survey">
                  <p>The mechanisms of experimentation are:<br/>
                  SLIDERS<br/>
                  So, slide from one end to the other <br/>
                  to explore the sides of your self.<br/>
                  The sides are intentionally vague.<br/>
                  All inputs are valid.<br/>
                  You will see your inputs visualised as rings.</p>
                </SurveyCard>
              }


              {currentUserState.surveyCompletitionIndex === 3 &&
                <SurveyCard title="New Identity" button="Next" name="survey">
                  <p>The labels of the sides are intentionally vague.<br/>
                  All inputs are valid.<br/>
                  If your input is “not applicable”, simply leave that slider alone.</p>
                  {
                    IDENTITY.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 4 &&
                <SurveyCard title="" button="Next" name="survey">
                  <p>Your new identity has been registered to the New Europe</p>
                  <p>Move to the next room to continue evolution</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 5 &&
                <SurveyCard title="Listen" button="Next" name="survey">
                  <p>After you hear the audio press next</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 6 &&
                <SurveyCard title="Listen" button="I'm in" name="survey">
                  <p>In this space, you will explore different viewpoints and values<br/>
                  See your identity rings visualised at the top of the dome</p>
                  <p>Now, go inside the dome.</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 7 &&
                <SurveyCard title="Listen" button="Ok" name="survey">
                  <p>Slide from one end to the other to hear different voices expressing potential values</p>
                  <p>Listen, slide, then leave the slider at the voice whose values you share</p>
                  <p>You will see your value inputs visualised as new rings under the identity rings above you</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 8 &&
                <SurveyCard title="Values Selection" button="Next" name="survey">
                  <p>The labels of the sides are intentionally vague.<br/>
                  All inputs are valid.<br/>
                  If your input is “not applicable”, simply leave that slider alone.</p>
                  {
                    VALUES.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 9 &&
                <SurveyCard title="Values Selection" button="Next" name="survey">
                  <p>Your values have been added to the New Europe<br/>
                  Move to the next room to continue evolution</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 10 &&
                <SurveyCard title="Listen" button="Next" name="survey">
                  <p>After you hear the audio press next</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 11 &&
                <SurveyCard title="" button="Ready" name="survey">
                  <p>Give your input to one last question to complete your new self.</p>
                  <p>Ready?</p>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 12 &&
                <SurveyCard title="???" button="Next" name="survey">
                  {
                    COLLECTIVE.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 13 &&
                <SurveyCard title="" button="" name="survey">
                  <p>We heard you. Did you hear each other yet?<br/>
                  Go lie down in the nets of your New Europe.<br/>
                  Gaze at the big picture of all the creatures created so far.<br/>
                  See if you can find yourself</p>

                  {/*Tap your screen - you will see your imprint glow (the rings that reflect all of your inputs so far)</p>*/}

                  {/*<Button type="" onClick={this.highlightUser} className={`mt3 mb3 transition-standard`}>See youself</Button>*/}

                </SurveyCard>
              }

            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
