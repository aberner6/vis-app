import firebase from 'firebase'
import { IDENTITY, VALUES, COLLECTIVE } from './CONSTANTS'
import axios from 'axios'
import map from 'lodash/map'

const FIREBASE_CONFIG = {
  // Initialize Firebase
  apiKey: 'AIzaSyAE5i_pa3vZCw0asuAYJYJfT436MG9BZKg',
  authDomain: 'cohere-d61af.firebaseapp.com',
  databaseURL: 'https://cohere-d61af.firebaseio.com',
  projectId: 'cohere-d61af',
  storageBucket: 'cohere-d61af.appspot.com',
  messagingSenderId: '256182960111',
}

firebase.initializeApp(FIREBASE_CONFIG)
const participants = firebase.database().ref('participants')
const looping = firebase.database().ref('looping')

// this function takes the object returned from firebase and transforms it into an array with every element having an id
function normalize(data) {
  return map(data, (el, id) => {
    // console.log('mapping', el, id)
    return {
      ...el,
      id,
    }
  })
}

export function newUser() {
  const newKey = participants.push().key

  const timestamp = Date.now()
  const user = {}

  IDENTITY.map((el, i) => (
    user[el.name] = 50
  ))
  VALUES.map((el, i) => (
    user[el.name] = 50
  ))
  COLLECTIVE.map((el, i) => (
    user[el.name] = 50
  ))

  user.created = timestamp
  user.updated = timestamp

  firebase.database().ref('participants/' + newKey).set(user)

  return newKey
}

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/participants').limitToLast(49).on('value', (snap) => resolve(normalize(snap.val())))
  })
}

export function fetchUser(uID) {
  return new Promise((resolve, reject) => {
    // console.log('fetching single user', uID);
    if (uID === 'latest') {
      firebase.database().ref('/participants').limitToLast(1).on('value', (snap) => {
        // console.log('firebase got latest', snap.val());
        return resolve(normalize(snap.val()))
      })
    } else {
      firebase.database().ref('/participants/' + uID).on('value', (snap) => {
        const fixedData = {}
        fixedData[uID] = snap.val()
        // console.log('firebase got this', fixedData);
        return resolve(snap.val())
      })
    }
  })
}

export function listenForNewUsers(startAt, callback) {
  // filter out the elements created before now
  participants.orderByChild('created').startAt(startAt).on('child_added', (data) => {
    // console.log('listenForNewUsers child_added', data.key, data.val().created)
    callback({
      ...data.val(),
      id: data.key,
    })
  })
}

export function listenForUpdatedUsers(callback) {
  // filter out the elements created before now
  participants.on('child_changed', (data) => {
    // console.log('child_changed', data.val())
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

export function saveUser(data) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now()
    const user = data
    user.created = timestamp
    user.updated = timestamp
    participants.push(user).then((data) => resolve(data.key))
  })
}

export function updateUser(uID, data) {
  return new Promise((resolve, reject) => {
    // console.log("updates- "+uID, data)
    const userData = data
    userData.updated = Date.now()
    firebase.database().ref('/participants/' + uID).update(userData)
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
