import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import ReactAudioPlayer from 'react-audio-player'
import CurrentUserState from '../state/CurrentUserState'

import { listenForLooping } from '../api'

@inject('allUsersState')
@observer
export default class Sounds extends Component {
  constructor(props) {
    super(props)

    this.state = { loopingIndex: 0 }

    listenForLooping((looping) => {
      if (looping) {
        this.showInterval = setInterval(this.nextIndex, 8000)
      } else {
        clearInterval(this.showInterval)

        this.setState({ loopingIndex: 0 })
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.showInterval)
  }

  nextIndex = () => {
    this.setState((prevState) => {
      const maxLoopingIndex = this.dataList.length + 1
      const loopingIndex = (prevState.loopingIndex + 1) % maxLoopingIndex
      return { loopingIndex }
    })
  }

  render() {
    const { staticDataContainer } = this.props.allUsersState
    const { loopingIndex } = this.state

    // TODO put this login in state with a getStaticData(loopingIndex) when we have the archive page
    let activeDataName
    let activeData
    let activeDataTitle
    let isStatic = false
    if (loopingIndex > 0) {
      activeDataName = this.dataList[loopingIndex - 1].fileName
      activeDataTitle = this.dataList[loopingIndex - 1].title
      activeData = staticDataContainer.get(activeDataName)
      isStatic = true
    }

    return (
	    <div className="h-100 tc flex flex-column justify-center items-center">
	    <ReactAudioPlayer src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" controls/>
	    </div>
    )
  }
}
