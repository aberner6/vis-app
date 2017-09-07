import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import HamburgerMenu from './HamburgerMenu'
import Visualized from '../views/Visualized'
import About from '../views/About'
import Survey from '../views/Survey'
import VisualizedProjection from '../views/VisualizedProjection'
import LoopControls from '../views/LoopControls'
import ForgetSurvey from '../views/ForgetSurvey'

export default class App extends Component {
  render() {
    return (
      <div className="h-100">
        {location.pathname !== '/projection' &&
          <HamburgerMenu/>
        }
        <Route exact path="/" component={Visualized}/>
        <Route path="/about" component={About}/>
        <Route path="/survey" component={Survey}/>
        <Route path="/projection" component={VisualizedProjection}/>
        <Route path="/loop" component={LoopControls}/>
        <Route path="/forget" component={ForgetSurvey}/>
      </div>
    )
  }
}
