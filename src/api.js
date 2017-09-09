import firebase from 'firebase'
import { GENDERS, ETHNICITY } from './CONSTANTS'
import axios from 'axios'
import map from 'lodash/map'

const FIREBASE_CONFIG = {
  // Initialize Firebase
  apiKey: 'AIzaSyAE5i_pa3vZCw0asuAYJYJfT436MG9BZKg',
  authDomain: 'cohere-d61af.firebaseapp.com',
  databaseURL: 'https://cohere-d61af.firebaseio.com',
  projectId: 'cohere-d61af',
  storageBucket: 'cohere-d61af.appspot.com',
  messagingSenderId: '256182960111'
}

firebase.initializeApp(FIREBASE_CONFIG)
const participants = firebase.database().ref('participants')
const looping = firebase.database().ref('looping')

// this function takes the object returned from firebase and transforms it into an array with every element having an id
function normalize(data) {
  return map(data, (el, id) => {
    return {
      ...el,
      id,
    }
  })
}

export function newUser() {
  const newKey = participants.push().key;

  const timestamp = Date.now()
  const user = {
    created: timestamp,
    updated: timestamp,
    num: 0,
    gender: 0,
    ethnicity: 0,
    age: 0,
  }

  firebase.database().ref('participants/'+newKey).set(user)

  return newKey
}

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    participants.once('value', (snap) => resolve(normalize(snap.val())))
  })
}

export function fetchUser(uID) {
  return new Promise((resolve, reject) => {
    console.log('participants/'+uID)
    firebase.database().ref('/participants/'+uID).on('value', (snap) => resolve(normalize(snap.val())))
  })
}

export function listenForNewUsers(startAt, callback) {
  // filter out the elements created before now
  participants.orderByChild('created').startAt(startAt).on('child_added', (data) => {
    console.log('listenForNewUsers child_added', data.key, data.val().created)
    callback({
      ...data.val(),
      id: data.key,
    })
  })
}

export function listenForUpdatedUsers(callback) {
  // filter out the elements created before now
  participants.on('child_changed', (data) => {
    console.log('child_changed', data.val())
    callback({
      ...data.val(),
      id: data.key,
    })
  })
}

export function stopListeningForNewUsers() {
  participants.off('child_added')
}
export function stopListeningForUpdatedUsers() {
  participants.off('child_changed')
}

export function saveUser(num, gender, ethnicity, age) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now()
    const user = {
      created: timestamp,
      updated: timestamp,
      num,
      gender,
      ethnicity,
      age,
    }
    participants.push(user).then((data) => resolve(data.key))
  })
}

export function updateUser(uID, data) {
  return new Promise((resolve, reject) => {
    console.log("updates- "+uID)
    const userData = data
    userData.updated = Date.now()
    firebase.database().ref('/participants/'+uID).update(userData)
  })
}

export function trackMyLine(currentUserId) {
  return new Promise((resolve, reject) => {
    participants.child(currentUserId).update({
      updated: Date.now(),
    }).then((data) => resolve())
  })
}

export function loadJSON(fileName) {
  return new Promise((resolve, reject) => {
    axios.get(`data/${fileName}.json`)
      .then(({ data: json }) => resolve(normalize(json)))
  })
}

export function listenForLooping(callback) {
  looping.on('value', (data) => {
    callback(data.val())
  })
}

export function setLooping(loopingValue) {
  looping.set(loopingValue)
}

// TODO remove this outside of development
export function addRandom() {
  const timestamp = Date.now()
  const random = {
    created: timestamp,
    updated: timestamp,
    age: Math.floor(Math.random() * 99) + 1, // random between 1 and 99
    gender: GENDERS[Math.floor(Math.random() * GENDERS.length)].name,
    ethnicity: ETHNICITY[Math.floor(Math.random() * ETHNICITY.length)].name,
  }

  participants.push(random)
}

// TODO remove this outside of development
export function clear() {
  participants.remove()
  addRandom()
}
