import React, { Component } from 'react'
import SourceLink from '../ui/SourceLink'
import OnlyPlayPauseButton from '../ui/OnlyPlayPauseButton'

class Sounds extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='ui'>
          <section>
            <h1>Simple Player</h1>
            <p className='subheading'>Only play/pause button</p>
            <OnlyPlayPauseButton />
            <SourceLink fileName='OnlyPlayPauseButton' />
          </section>
        </div>
      </div>
    )
  }
}

export default Sounds
