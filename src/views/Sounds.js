
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import ReactAudioPlayer from 'react-audio-player'
import CurrentUserState from '../state/CurrentUserState'

@inject('currentUserState')

export default class Sounds extends Component {
    render() {
        return (
        <div className="h-100 tc flex flex-column justify-center items-center">
        <ReactAudioPlayer src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" controls/>
        </div>
        )
    }
}
