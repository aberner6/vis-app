import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { renderUser } from '../renderUser'

@inject('currentUserState')
@observer
export default class UserLine extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    renderUser(this.props.currentUserState, 100, true)
  }

  render() {
    console.log(this.props.currentUserState.currentUserData)

    return (
      <div className="relative transition-standard">
        <svg className="flex-auto" id="lines-grid">
          <g id="grid-container"></g>
        </svg>
      </div>
    )
  }
}
