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
                <SurveyCard title="Through this app you will create your alternative passport." button="TAP" name="pre1">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 1 &&
                <SurveyCard title="You are now ready to enter the New Europe." button="Enter Room 1" name="pre1">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 2 &&
                <SurveyCard title="You will start by experimenting with your identity." button="Ready" name="pre2">
                </SurveyCard>
              }


              {currentUserState.surveyCompletitionIndex === 3 &&
                <SurveyCard title="Create Your New Identity" button="Done" name="identity">
                  {
                    IDENTITY.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 4 &&
                <SurveyCard title="Your new identity has been registered to the New Europe" button="Next Room" name="pre2">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 5 &&
                <SurveyCard title="Now choose values for your New Europe" button="Ready" name="pre2">
                <h3>Go in the dome</h3>
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 6 &&
                <SurveyCard title="What do you value?" button="Done" name="values">
                  {
                    VALUES.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 7 &&
                <SurveyCard title="Your values have been registered to the New Europe" button="Up the Stairs" name="survey">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 8 &&
                <SurveyCard title="Nice view! Take a breath. Now go through the doorway" button="Ok" name="survey">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 9 &&
                <SurveyCard title="Last question to complete your New Europe passport." button="Ready?" name="survey">
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 10 &&
                <SurveyCard title="What is the role of the past in the New Europe?" button="Submit" name="survey">
                  {
                    COLLECTIVE.map((el, i) => (
                      <SliderInput key={i} data={el} value={currentUserState[el.name]} onChange={currentUserState.updateValue}/>
                    ))
                  }
                </SurveyCard>
              }

              {currentUserState.surveyCompletitionIndex === 11 &&
                <SurveyCard title="We Heard You" button="" name="survey">
                  <p>Go lie down in the nets of your New Europe.</p>
                  <p>See the bigger picture.</p>
                  <p>Can you find yourself?</p>
                  <p>How similar or different are your New Europes?</p>
                  <p>We're learning from your input but your data is anonymised.</p>
                  <p>We hope to share our learning with the European Union.</p>
                  <p>Learn more at research.ncl.ac.uk/cohere/</p>
                </SurveyCard>
              }

            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
