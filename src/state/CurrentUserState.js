import { observable, computed, action } from 'mobx'
import { ETHNICITY, GENDERS } from '../CONSTANTS'

function fetchLocalStorageData(key = null) {
  if (localStorage.getItem('currentUserData') === null) {
    return null
  }

  const userData = JSON.parse(localStorage.getItem('currentUserData'))
  return key ? userData[key] : userData
}

export default class CurrentUserState {
  @observable num = fetchLocalStorageData('num')

  @observable id = fetchLocalStorageData('id')
  @observable gender = fetchLocalStorageData('gender')
  @observable ethnicity = fetchLocalStorageData('ethnicity')
  @observable age = fetchLocalStorageData('age')

  @observable surveyCompletitionIndex = 0
  @observable surveyCompleted = Boolean(localStorage.getItem('currentUserData'))

  @action.bound
  updateNum(num) {
    this.num = num
  }

  @action.bound
  updateGender(gender) {
    this.gender = gender
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
    // TODO push partial data to firebase for current user -- "queueUser" from AllUsersState?
  }

  @action.bound
  completeSurvey(userId) {
    this.id = userId

    const userData = {
      num: this.num,
      id: this.id,
      gender: this.gender,
      ethnicity: this.ethnicity,
      age: this.age,
    }

    try {
      localStorage.setItem('currentUserData', JSON.stringify(userData))
    } catch (e) {}

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
