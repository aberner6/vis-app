import { observable, computed, action } from 'mobx'
import { IDENTITY, VALUES, COLLECTIVE } from '../CONSTANTS'
import { fetchUser, updateUser, newUser } from '../api'

function fetchLocalStorageData(key = null) {
  if (localStorage.getItem('currentUserData') === null) {
    return null
  }

  const userData = JSON.parse(localStorage.getItem('currentUserData'))
  return key ? userData[key] : userData
}

export default class CurrentUserState {
  @observable uID = ""

  @observable Q1 = 50
  @observable Q2 = 50
  @observable Q3 = 50
  @observable Q4 = 50
  @observable Q5 = 50
  @observable Q6 = 50
  @observable Q7 = 50
  @observable Q8 = 50
  @observable Q9 = 50
  @observable Q10 = 50

  @observable surveyCompletitionIndex = 0
  @observable surveyCompleted = Boolean(localStorage.getItem('currentUserData'))

  constructor() {
    //console.log(localStorage.getItem('currentUserData'))
    // if (localStorage.getItem('currentUserData')) {
    //   this.Q1 = fetchLocalStorageData('Q1')
    //   this.Q2 = fetchLocalStorageData('Q2')
    //   this.Q3 = fetchLocalStorageData('Q3')
    //   this.Q4 = fetchLocalStorageData('Q4')
    //   this.Q5 = fetchLocalStorageData('Q5')
    //   this.Q6 = fetchLocalStorageData('Q6')
    //   this.Q7 = fetchLocalStorageData('Q7')
    //   this.Q8 = fetchLocalStorageData('Q8')
    //   this.Q9 = fetchLocalStorageData('Q9')
    //   this.uID = fetchLocalStorageData('uID')
    // } else {
    // }
  }

  newUser() {
    this.uID = newUser()
    this.surveyCompletitionIndex = 0
    this.surveyCompleted = false
  }

  @action.bound
  updateuID(id) {
    this.uID = id
  }

  @action.bound
  updateValue(qNum, val) {
    const data = new Object()
    this[qNum] = val
    data[qNum] = val

    const userData = {
      Q1: this.Q1,
      Q2: this.Q2,
      Q3: this.Q3,
      Q4: this.Q4,
      Q5: this.Q5,
      Q6: this.Q6,
      Q7: this.Q7,
      Q8: this.Q8,
      Q9: this.Q9,
      Q10: this.Q10,
      uID: this.uID,
    }

    localStorage.setItem('currentUserData', JSON.stringify(userData))

    updateUser(this.uID, data)
  }

  @action.bound
  emptySurveyData() {
    IDENTITY.map((el, i) => (
      this[el.name] = 0
    ))
    VALUES.map((el, i) => (
      this[el.name] = 0
    ))
    COLLECTIVE.map((el, i) => (
      this[el.name] = 0
    ))
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
    return [this.Q1, this.Q2, this.Q3, this.Q4, this.Q5, this.Q6, this.Q7, this.Q8, this.Q9, this.Q10 ]
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
      Q10: this.Q10,
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
