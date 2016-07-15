import React from 'react'
import * as Game from '../models/game'

export default class Mike extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="opponent six columns">
        <div>
          <h5>{this.props.opponent.name}</h5>
        </div>
        <div className="arena container">
          {this.props.icon ?
          <img src = {this.props.icon}/> :
          <img src = "/images/qmark.png"/>}
        </div>
        <div>
          <button disabled>Rock</button>
          <button disabled>Paper</button>
          <button disabled>Scissors</button>
        </div>
      </div>
    );
  }
}
