// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import ReactAudioPlayer from 'react-audio-player'
// import CurrentUserState from '../state/CurrentUserState'

// const currentUserState = new CurrentUserState()

// const userData = JSON.parse(localStorage.getItem('currentUserData'))

// console.log(userData.age)
// if(userData.age>0){
// 	console.log("whats up")
// 	// $('audio.react-audio-player').play()
// }
// export default class Sounds extends Component {
//     render() {
//         return (
//         <div className="h-100 tc flex flex-column justify-center items-center">
//         <ReactAudioPlayer src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" controls/>
//         </div>
//         )
//     }
// }
// In your React component: 

//handler for the data that references the audio objects?

//loads file for sound
//on can play, check data to see if should play?


//
//what is the current user's data (yay this is not local)?
//if data.num > 0 and <50 play X audio file
//else play Y audio file

//this is the view only
//this gets called with the approp data from the event that happens when the data gets updated in the database

// render() {
//   return (
//     <Sound
//       url="cool_sound.mp3"
//       playStatus={Sound.status.PLAYING}
//       playFromPosition={300 /* in milliseconds */}
//       onLoading={this.handleSongLoading}
//       onPlaying={this.handleSongPlaying}
//       onFinishedPlaying={this.handleSongFinishedPlaying}
//     />
//   );
// }