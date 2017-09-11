import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { maxBy } from 'lodash'
import { renderUser } from '../renderUser'
import { fetchUser, listenForNewUsers, listenForUpdatedUsers, stopListeningForNewUsers, stopListeningForUpdatedUsers } from '../api'
import SurveyRecap from '../containers/SurveyRecap'

function onResizeWindow(fn) {
  window.addEventListener('resize', fn)
  return () => window.removeEventListener('resize', fn)
}

@inject('currentUserState')
export default class LinesGridFirebase extends Component {
  currentUser = new Object()

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
    if (this.props.isStatic) {
      renderChart(this.props.data, this.props.renderDelay, true)
    } else {
      this.startRealtimeFetching()
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isStatic) {
      if (prevProps.isStatic !== this.props.isStatic) {
        this.stopRealtimeFetching()
      }
      renderChart(this.props.data, this.props.renderDelay)
    } else {
      if (prevProps.isStatic !== this.props.isStatic) {
        this.startRealtimeFetching()
      }
    }
  }
  componentWillUnmount() {
    if (!this.props.isStatic) {
      this.stopRealtimeFetching()
    }
  }

  startRealtimeFetching = () => {
    const { trackUsers } = this.props
    fetchUser('latest')
      .then(user => {
        console.log(user)
        // allUsersState.addUsers(users)
        // console.info(`Fetched ${users.length} users...`)
        // console.log(allUsersState)
        // this.setState({ loading: false })
        // console.log(allUsersState.allUsersSorted)
        // if (this.props.oneShotFetch) {
        //   return
        // }
        // const latest = maxBy(users, d => d.created)
        // console.log(latest)
        renderUser(user, this.props.renderDelay, true)

        listenForNewUsers(user[0].created + 1, user => {
          this.currentUser = user
          renderUser(user, this.props.renderDelay, true)
        })

        if (trackUsers) {
          listenForUpdatedUsers(data => {
            renderUser([data], this.props.renderDelay, true)
          })
        }
      })

      // watch the first element of the queue, and call when is added to allUsers
    // this.reactionDisposer = reaction(() => {
    //   const allUsersState = this.props.allUsersState
    //   return allUsersState.userQueue.length && allUsersState.userQueue[0]
    // }, (firstOfQueue) => {
    //   if (!firstOfQueue) {
    //     return
    //   }
    //
    //   allUsersState.allUsers.push(firstOfQueue)
    //
    //   renderUser(allUsersState.allUsersSorted, this.props.renderDelay)
    //   .then(() => allUsersState.userQueue.shift()) // we shift it at the end to trigger the reaction
    // })
  }
  stopRealtimeFetching = () => {
    stopListeningForNewUsers()
    stopListeningForUpdatedUsers()
    // this.reactionDisposer()
  }
  render() {
    return (
      <svg className="flex-auto" id="lines-grid">
        <g id="grid-container"></g>
      </svg>
    )
  }
}
