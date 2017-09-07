import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { GENDERS, ETHNICITY } from '../CONSTANTS'

@inject('allUsersState')
@observer
export class StatsGender extends Component {
  render() {
    const { allUsersCountByGender } = this.props.allUsersState

    return (
      <div>
        {
          GENDERS.map(({ name: gender }, i) => (
            <div key={i}>
              {gender} <span>{allUsersCountByGender[gender]}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

@inject('allUsersState')
@observer
export class StatsEtnicity extends Component {
  render() {
    const { allUsersCountByEthnicity } = this.props.allUsersState

    return (
      <div>
        {
          ETHNICITY.map(({ name: ethnicity }, i) => (
            <div key={i}>
              {ethnicity} <span>{allUsersCountByEthnicity[ethnicity]}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

@inject('allUsersState')
@observer
export class StatsAge extends Component {
  render() {
    const { avgAge } = this.props.allUsersState

    return (
      <div>
        Average Age <span>{avgAge}</span>
      </div>
    )
  }
}
