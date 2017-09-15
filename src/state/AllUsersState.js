import { observable, computed, action } from 'mobx'
import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

import { loadJSON } from '../api'

export default class AllUsersState {
  // hold here all the data from firebase
  @observable allUsers = []

  // the queue of the user that still have to be inserted in the grid
  @observable userQueue = []

  // the sorting of allUsers to display
  @observable sorting = 'age'

  staticDataContainer = observable.shallowMap()

  // populate the allUsers array
  @action.bound
  addUsers(usersData) {
    this.allUsers = usersData
  }
  // populate the allUsers array
  @action.bound
  addUser(userData) {
    this.allUsers.push(userData)
  }
  // populate the allUsers array
  @action.bound
  updateUser(userData) {
    const toUpdate = this.allUsers.find(d => d.id === userData.id)
    console.log('UPDATING THIS USER', toUpdate, userData);
    if (toUpdate) {
      toUpdate.Q1 = userData.Q1
      toUpdate.Q2 = userData.Q2
      toUpdate.Q3 = userData.Q3
      toUpdate.Q4 = userData.Q4
      toUpdate.Q5 = userData.Q5
      toUpdate.Q6 = userData.Q6
      toUpdate.Q7 = userData.Q7
      toUpdate.Q8 = userData.Q8
      toUpdate.Q9 = userData.Q9
      toUpdate.Q10 = userData.Q10
      toUpdate.updated = userData.updated
    }
  }

  // add a single user to the queue
  @action.bound
  queueUser(userData) {
    this.userQueue.push(userData)
  }

  @action.bound
  emptyUsersAndQueue() {
    this.allUsers = []
    this.userQueue = []
  }

  @action.bound
  loadStaticData(fileName) {
    if (this.staticDataContainer.has(fileName)) {
      return
    }

    loadJSON(fileName)
      .then((json) => {
        this.staticDataContainer.set(fileName, json)
      })
  }

  @computed get allUsersSorted() {
    return sortBy(this.allUsers, this.sorting)
  }

  // get the number of users
  @computed get allUsersCount() {
    return this.allUsers.length
  }

  // get the average age
  @computed get avgAge() {
    const sum = this.allUsers.map(user => user.age).reduce((sum, val) => sum + val, 0)
    const average = sum / this.allUsers.length
    return average.toFixed(1)
  }

  // get the number of users in an splitted object by gender
  @computed get allUsersCountByGender() {
    return mapValues(groupBy(this.allUsers, 'gender'), el => el.length)
  }

  // get the number of users in an splitted object by ethnicity
  @computed get allUsersCountByEthnicity() {
    return mapValues(groupBy(this.allUsers, 'ethnicity'), el => el.length)
  }
}
