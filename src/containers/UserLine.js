import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { renderUser } from '../renderUser'
import { renderSound } from '../renderSound'

@inject('currentUserState')
@observer
export default class UserLine extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    renderUser(this.props.currentUserState)
    renderSound(this.props.currentUserState)
  }

  render() {
    return (
      <svg className="flex-auto" id="lines-grid">
        <g id="grid-container"></g>
      </svg>
      <svg className="flex-auto" id="sounds">
        <g id="grid-container"></g>
      </svg>
    )
  }
}
