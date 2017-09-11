import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { renderUser } from '../renderUser'

@inject('currentUserState')
@observer
export default class UserLine extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.currentUserState.currentUserData)
    renderUser(this.props.currentUserState, 100, true)


    return (
      <div className="relative transition-standard">
        <svg className="flex-auto" id="lines-grid">
          <g id="grid-container"></g>
        </svg>
      </div>
    )
  }
}
