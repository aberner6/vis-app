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
  @observable uID = fetchLocalStorageData('uID')

  @observable Q1 = fetchLocalStorageData('Q1')
  @observable Q2 = fetchLocalStorageData('Q2')
  @observable Q3 = fetchLocalStorageData('Q3')
  @observable Q4 = fetchLocalStorageData('Q4')
  @observable Q5 = fetchLocalStorageData('Q5')
  @observable Q6 = fetchLocalStorageData('Q6')
  @observable Q7 = fetchLocalStorageData('Q7')
  @observable Q8 = fetchLocalStorageData('Q8')
  @observable Q9 = fetchLocalStorageData('Q9')


  @observable surveyCompletitionIndex = 0
  @observable surveyCompleted = Boolean(localStorage.getItem('currentUserData'))

  @action.bound
  updateuID(id) {
    this.uID = id
  }

  @action.bound
  updateValue(qNum, val) {
    const data = new Object()
    this[qNum] = val
    data[qNum] = val
    updateUser(this.uID, data)
  }

  @action.bound
  emptySurveyData() {
    this.Q1 = 0
    this.Q2 = 0
    this.Q3 = 0
    this.Q4 = 0
    this.Q5 = 0
    this.Q6 = 0
    this.Q7 = 0
    this.Q8 = 0
    this.Q9 = 0
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
    return [this.Q1, this.Q2, this.Q3, this.Q4, this.Q5, this.Q6, this.Q7, this.Q8, this.Q9 ]
  }

  @computed get currentUserDataObject() {
    return {
      Q1: this.Q1,
      Q2: this.Q2,
      Q3: this.Q3,
      Q4: this.Q4,
      Q5: this.Q5,
      Q6: this.Q6,
      Q7: this.Q7,
      Q8: this.Q8,
      Q9: this.Q9,
    }
  }

  @computed get currentUserAngle() {
    // const currentGender = GENDERS.find(gender => gender.name === this.gender)
    return null
  }

  @computed get currentUserColor() {
    // const currentEthnicity = ETHNICITY.find(ethnicity => ethnicity.name === this.ethnicity)
    return '#818190'
  }
}
