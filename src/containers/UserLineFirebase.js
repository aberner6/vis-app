import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { maxBy } from 'lodash'
import { renderUser, updateUser } from '../renderUser'
import { fetchUser, listenForNewUsers, listenForUpdatedUsers, stopListeningForNewUsers, stopListeningForUpdatedUsers } from '../api'
import SurveyRecap from '../containers/SurveyRecap'

export default class UserLineFirebase extends Component {

  static defaultProps = {
    trackUsers: true,
    isStatic: false,
    oneShotFetch: false,
    data: [],
    renderDelay: 0,
  }
  // TODO add a state that hides/shows the lines for the transaction
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.startRealtimeFetching()
  }

  componentWillUnmount() {
    if (!this.props.isStatic) {
      this.stopRealtimeFetching()
    }
  }

  startRealtimeFetching = () => {
    fetchUser('latest')
      .then(user => {

        this.currentUser = user[0]

        renderUser(this.currentUser)

        listenForNewUsers(user[0].created + 1, user => {
          this.currentUser = user[0]
        })

        listenForUpdatedUsers(data => {
          this.currentUser = data
          renderUser(this.currentUser)
        })
      })
  }

  stopRealtimeFetching = () => {
    stopListeningForNewUsers()
    stopListeningForUpdatedUsers()
  }

  render() {
    return (
      <svg className="flex-auto" id="lines-grid">
        <g id="grid-container"></g>
      </svg>
    )
  }

}
