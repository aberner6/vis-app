import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import LinesGridFirebase from '../containers/LinesGridFirebase'

import { listenForLooping } from '../api'

@inject('allUsersState')
@observer
export default class VisualizedProjection extends Component {
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

    // TODO put this in index.js when we have an archive page
    // const { loadStaticData } = this.props.allUsersState
    // this.dataList = [
    //   {
    //     fileName: 'accurat',
    //     title: 'Accurat'
    //   }
    // ]
    // this.dataList.forEach((el) => loadStaticData(el.fileName))
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
      <div className="flex flex-column h-100 tc">

        <div className="relative flex-auto flex ma5">
          <LinesGridFirebase
            renderDelay={100}
            isStatic={isStatic}
            oneShotFetch={false}
            trackUsers={true}
            data={activeData}>
          </LinesGridFirebase>
        </div>

        <h3 className="f3">
          {loopingIndex > 0 ? activeDataTitle : 'Real-time Visualized' }
        </h3>

        <div className="pa3 pt5 pb5 fw4 f5 lh-copy">
          Go to <u>verso.accurat.io</u>
          <br/>
          to include yourself in the Visualized diversity census
        </div>

      </div>
    )
  }
}
