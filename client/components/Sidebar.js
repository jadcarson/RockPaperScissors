import React from 'react'
import { Link } from 'react-router'
import ChatApp from './ChatApp.js'
import Challenge from './Challenge'

import * as db from '../models/menu'

export default class Sidebar extends React.Component{
	constructor() {
    super();
    this.state = {
      players: [],
      gameStatus: ''
    };
  }

  playerStatus() {

  }

render() {
    return (
        <div className="sidebar container narrative three columns offset-by-nine column vertical">
          <div className="challenge-app">
            <Challenge />
          </div>
          <div className="chat">
            <ChatApp />
          </div>
        </div>
    );
  }
}
