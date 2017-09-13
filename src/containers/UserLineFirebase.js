import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { maxBy } from 'lodash'
import { renderUser, updateUser } from '../renderUser'
import { fetchUser, listenForNewUsers, listenForUpdatedUsers, stopListeningForNewUsers, stopListeningForUpdatedUsers } from '../api'
import SurveyRecap from '../containers/SurveyRecap'

export default class UserLineFirebase extends Component {

  static defaultProps = {
    userToViz: 'latest'
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
    this.stopRealtimeFetching()
  }

  startRealtimeFetching = () => {
    fetchUser(this.props.userToViz)
      .then(user => {

        if (user[0]) {
          user = user[0]
        }

        // console.log('user to viz', user);

        this.currentUser = user

        renderUser(this.currentUser)

        listenForNewUsers(user.created + 1, user => {
          this.currentUser = user
          renderUser(this.currentUser)
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
