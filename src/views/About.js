import React, { Component } from 'react'
import { GENDERS, ETHNICITY } from '../CONSTANTS'

export default class About extends Component {
  render() {
    return (
      <div className="w-90 mw7 center">
        <h2 className="tc pv3 ma0">About</h2>

        <div className="tc lh-copy">
          <p><strong>Project ‘Verso’</strong> is a collaborative web-app created by Accurat to analyze <strong>diversity within various environments</strong> relying on a visual model which is purposely designed to represent the richness of a population and emphasize its multiculturalism.</p>

          <p>Built as a prototype for the Visualized 2017 conference and focused on the design field, the project will be fully developed in the next monthsto extend users’ interaction and exploration, to become <strong>a growing ecosystem of entities depending on user generated data  and to be open to different fields and situations.</strong></p>

          <p>The main goal is to <strong>engage people and encourage the discussion about diversity within micro and macro societies</strong>, by highlighting their uniqueness in their own social groups.</p>

          <p>Accurat would like to thank all the speakers and the people involved in the conference for participating in this initiative.</p>
        </div>

        <div className="cf">
          <div className="w-90 w-50-ns fl pv3 pv5-l flex-ns justify-center-ns">
            <div>
              <p><strong>Gender</strong></p>
              {
                GENDERS.map((el, i) => (
                  <div className="pv2 pl4 relative" key={i}>
                    <svg width="25" height="25" viewBox="0 0 100 100" className="db absolute top-0 left-0"
                      style={{ top: '3px', left: '0' }}>
                      <line fill="none" transform={`rotate(${el.angle} 50 50)`} stroke="#FFFFFF" strokeWidth="2" x1="0" y1="50" x2="100" y2="50"/>
                    </svg>
                    {el.name}
                  </div>
                ))
              }
            </div>
          </div>

          <div className="w-90 w-50-ns fl pv3 pv5-l flex-ns justify-center-ns">
            <div>
              <p><strong>Ethnic Group</strong></p>
              {
                ETHNICITY.map((el, i) => (
                  <div className="pv2 pl4 relative" key={i}>
                    <svg width="12" height="12" viewBox="0 0 100 100" className="db absolute top-0 left-0"
                      style={{ top: '10px', left: '6px' }}>
                      <circle cx="50" cy="50" r="50" stroke="none" fill={el.color}/>
                    </svg>
                    {el.name}
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </div>
    )
  }
}
