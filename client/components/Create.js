import React from 'react'
import { Link, browserHistory } from 'react-router'

import * as db from '../models/menu'

export default class Join extends React.Component {
  constructor(){
    super();
  }

  // generate new access code and reroute to there
  handleCreate(e) {
    e.preventDefault();
    let gameGenerated = false;
    let accessCode = generateAccessCode();

    // get current list of games
    db.gameList()
      .then(gameList => {
        const accessCodes = gameList.map(game => game.access_code);
        // check if generated access code already exists 
        while (!gameGenerated) {
          if (!accessCodes.includes(accessCode)) {
            // create new game using access code
            db.generateNewGame(accessCode)
              .then(gameId => {
                // select first index because sql query returns array of rows
                gameId = gameId[0];

                // set current gameId to local storage
                sessionStorage.setItem('gameId', gameId);
                return gameId;
              })
              .then(gameId => {
                // create new user using new gameId
                db.userStartsGame(gameId)
                  .then(resp => {
                    let user_id = sessionStorage.getItem("user_id");
                    sessionStorage.setItem('accessCode', accessCode);
                    browserHistory.push(`/${accessCode}`);
                  })
              })
            gameGenerated = true;
          // re generate access code if already exist
          } else {
            accessCode = generateAccessCode();
          }
        }
      })
  }

  // show create game username input and buttons 
  render() {
    return (
      <form className="create-game">

        <div className="button-container">
          <button type="submit" onClick={this.handleCreate.bind(this)}>Create Game</button>
          <button onClick={this.props.handleViewChange.bind(null, 'menu')}>Back</button>
        </div>
      </form>
    );
  }
}

// generate random access code of 4 letters
function generateAccessCode() {
  let code = "";
  const possible = "abcdefghijklmnopqrstuvwxyz";
  for(let i = 0; i < 4; i++){
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return code;
}
