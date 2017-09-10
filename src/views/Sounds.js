import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactAudioPlayer from 'react-audio-player'
import CurrentUserState from '../state/CurrentUserState'

const currentUserState = new CurrentUserState()

const userData = JSON.parse(localStorage.getItem('currentUserData'))

// console.log(userData.age)
// if(userData.age>0){
// 	console.log("whats up")
// 	// $('audio.react-audio-player').play()
// }
export default class Sounds extends Component {
    render() {
        return (
        <div className="h-100 tc flex flex-column justify-center items-center">
        <ReactAudioPlayer src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" controls/>
        </div>
        )
    }
}
