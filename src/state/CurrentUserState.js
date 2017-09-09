import { observable, computed, action } from 'mobx'
import { ETHNICITY, GENDERS } from '../CONSTANTS'
import { updateUser } from '../api'

function fetchLocalStorageData(key = null) {
  if (localStorage.getItem('currentUserData') === null) {
    return null
  }

  const userData = JSON.parse(localStorage.getItem('currentUserData'))
  return key ? userData[key] : userData
}

export default class CurrentUserState {
  @observable num = fetchLocalStorageData('num')

  @observable uID = fetchLocalStorageData('uID')

  @observable id = fetchLocalStorageData('id')
  @observable gender = fetchLocalStorageData('gender')
  @observable ethnicity = fetchLocalStorageData('ethnicity')
  @observable age = fetchLocalStorageData('age')

  @observable surveyCompletitionIndex = 0
  @observable surveyCompleted = Boolean(localStorage.getItem('currentUserData'))

  @action.bound
  updateuID(id) {
    this.uID = id
  }

  @action.bound
  updateNum(num) {
    this.num = num
    updateUser(this.uID, { num: num })
  }

  @action.bound
  updateGender(gender) {
    this.gender = gender
    updateUser(this.uID, { gender: gender })
  }

  @action.bound
  updateEthnicity(ethnicity) {
    this.ethnicity = ethnicity
  }

  @action.bound
  updateAge(age) {
    this.age = age
  }

  @action.bound
  emptySurveyData(age) {
    this.num = null
    this.gender = null
    this.ethnicity = null
    this.age = null
    this.surveyCompletitionIndex = 0
  }

  @action.bound
  nextSurveyQuestion() {
    this.surveyCompletitionIndex++
  }

  @action.bound
  completeSurvey() {
    this.surveyCompleted = true
  }

  // get the displayable data of the current user
  @computed get currentUserData() {
    return [this.num, this.gender, this.ethnicity, this.age]
  }

  @computed get currentUserDataObject() {
    return {
      num: this.num,
      id: this.id,
      gender: this.gender,
      ethnicity: this.ethnicity,
      age: this.age,
    }
  }

  @computed get currentUserAngle() {
    const currentGender = GENDERS.find(gender => gender.name === this.gender)
    return currentGender ? currentGender.angle : null
  }

  @computed get currentUserColor() {
    const currentEthnicity = ETHNICITY.find(ethnicity => ethnicity.name === this.ethnicity)
    return currentEthnicity ? currentEthnicity.color : '#818190'
  }
}
