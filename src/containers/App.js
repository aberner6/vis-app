import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Visualized from '../views/Visualized'
import Survey from '../views/Survey'
import VisualizedProjection from '../views/VisualizedProjection'
import ForgetSurvey from '../views/ForgetSurvey'

export default class App extends Component {
  render() {
    return (
      <div className="h-100">
        <Route exact path="/" component={Survey}/>
        <Route path="/viz" component={Visualized}/>
        <Route path="/survey" component={Survey}/>
        <Route path="/projection" component={VisualizedProjection}/>
        <Route path="/forget" component={ForgetSurvey}/>
      </div>
    )
  }
}
