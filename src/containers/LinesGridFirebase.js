import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { reaction } from 'mobx'
import { maxBy } from 'lodash'
import { renderChart, highlightElement } from '../renderChart'
import { checkTrackMyLine, fetchUsers, listenForNewUsers, listenForUpdatedUsers, stopListeningForNewUsers, stopListeningForUpdatedUsers } from '../api'

function onResizeWindow(fn) {
  window.addEventListener('resize', fn)
  return () => window.removeEventListener('resize', fn)
}

@inject('allUsersState')
export default class LinesGridFirebase extends Component {
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
    const allUsersState = this.props.allUsersState
    if (this.props.isStatic) {
      renderChart(this.props.data, this.props.renderDelay, true)
    } else {
      this.startRealtimeFetching()
    }
    this.resizeDisposer = onResizeWindow(() => {
      if (this.props.isStatic) {
        renderChart(this.props.data, this.props.renderDelay)
      } else {
        renderChart(allUsersState.allUsersSorted, this.props.renderDelay)
      }
    })
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
    const { allUsersState } = this.props

    allUsersState.emptyUsersAndQueue()

    this.resizeDisposer()
    if (!this.props.isStatic) {
      this.stopRealtimeFetching()
    }
  }
  startRealtimeFetching = () => {
    const allUsersState = this.props.allUsersState
    const { trackUsers } = this.props

    // checkTrackMyLine().then(function(d) {
    //   highlightElement(d)
    // })

    fetchUsers()
      .then(users => {
        allUsersState.addUsers(users)
        // console.info(`Fetched ${users.length} users...`)
        // console.log(allUsersState)
        this.setState({ loading: false })
        renderChart(allUsersState.allUsersSorted, this.props.renderDelay, true)

        const latest = maxBy(users, d => d.created)
        listenForNewUsers(latest.created + 1, user => {
          console.log("NEW USER ADDED")
          allUsersState.addUser(user)
          renderChart(allUsersState.allUsersSorted, this.props.renderDelay, true)
        })

        listenForUpdatedUsers(data => {
          allUsersState.updateUser(data)
          //highlightElement(data)
          console.log('updated user',data);
          console.log('new all users', allUsersState.allUsersSorted);
          renderChart(allUsersState.allUsersSorted, this.props.renderDelay, true)
        })
      })

      // watch the first element of the queue, and call when is added to allUsers
    this.reactionDisposer = reaction(() => {
      const allUsersState = this.props.allUsersState
      return allUsersState.userQueue.length && allUsersState.userQueue[0]
    }, (firstOfQueue) => {
      if (!firstOfQueue) {
        return
      }

      allUsersState.allUsers.push(firstOfQueue)

      renderChart(allUsersState.allUsersSorted, this.props.renderDelay)
      .then(() => allUsersState.userQueue.shift()) // we shift it at the end to trigger the reaction
    })
  }
  stopRealtimeFetching = () => {
    stopListeningForNewUsers()
    stopListeningForUpdatedUsers()
    this.reactionDisposer()
  }
  render() {
    return (
      <svg className="flex-auto" id="lines-grid">
        <g id="grid-container"></g>
      </svg>
    )
  }
}
