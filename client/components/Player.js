import React from 'react'
import * as Game from '../models/game'

export default class Player extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="player six columns">
        <div>
          <h5>{this.props.player.name}</h5>
        </div>
        <div className="arena container">
          {this.props.icon ?
          <img src = {this.props.icon}/> :
          <img src = "/images/qmark.png"/>}
        </div>
        <div>
          <button onClick={this.props.handleMove.bind(null, 'rock')}>Cowboy</button>
          <button onClick={this.props.handleMove.bind(null, 'paper')}>Princess</button>
          <button onClick={this.props.handleMove.bind(null, 'scissors')}>Bear</button>
        </div>
      </div>
    );
  }
}
