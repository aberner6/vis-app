import 'babel-polyfill'

import 'tachyons'
import './style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'

import CurrentUserState from './state/CurrentUserState'
import AllUsersState from './state/AllUsersState'
import App from './containers/App'
import { addRandom, trackMyLine, clear } from './api'

const currentUserState = new CurrentUserState()
const allUsersState = new AllUsersState()

// TODO remove this outside of development
// window.addEventListener('keypress', (e) => {
//   switch (String.fromCharCode(e.which)) {
//     case 'k':
//       addRandom()
//       break
//     case 'l':
//       localStorage.clear()
//       allUsersState.emptyUsersAndQueue()
//       clear()
//       window.location.reload()
//       break
//     case 'h':
//       const userData = JSON.parse(localStorage.getItem('currentUserData'))
//       trackMyLine(userData.id)
//   }
// })

ReactDOM.render(
  <Router>
    <Provider currentUserState={currentUserState} allUsersState={allUsersState}>
      <App/>
    </Provider>
  </Router>,
  document.getElementById('root')
)
