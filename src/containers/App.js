import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Visualized from '../views/Visualized'
import Survey from '../views/Survey'
import Sounds from '../views/Sounds'
import VisualizedProjection from '../views/VisualizedProjection'
import ForgetSurvey from '../views/ForgetSurvey'

export default class App extends Component {
  render() {
    return (
      <div className="h-100">
        <Route exact path="/" component={Survey}/>
        <Route path="/sounds" component={Sounds}/>
        <Route path="/viz" component={Visualized}/>
        <Route path="/survey" component={Survey}/>
        <Route path="/projection" component={VisualizedProjection}/>
        <Route path="/forget" component={ForgetSurvey}/>
      </div>
    )
  }
}
