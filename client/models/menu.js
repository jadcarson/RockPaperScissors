import fetch from 'isomorphic-fetch';

//---------------Create a new Game------------//
export function generateNewGame(accessCode) {
  return fetch('/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accessCode: accessCode
    })
  })
  .then(gameId => gameId.json())
  .catch(error => console.error(error));
}

//--------------User starts new Game------------//
export function userStartsGame(gameId) {
  return fetch('/api/users/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
      user_id: sessionStorage.getItem("user_id")
    })
  })
  .then(resp => {
    return resp;
  })
  .catch(error => console.error(error));
}

//--------------User joins Game------------//
export function userJoinsGame(gameId) {
  return fetch('/api/users/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
      user_id: sessionStorage.getItem("user_id")
    })
  })
  .then(resp => {
    return resp;
  })
  .catch(error => console.error(error));
}

//--------------Generate a new Session------------//
export function generateNewSession(user_id) {
  if (user_id) {
    return fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
      })
    })
    .then(sessionId => sessionId.json())
    .catch(error => console.error(error));
  }
}

//--------------Create a new User------------//
export function createNewUser(user_id, name, photo_url, friends) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      name: name,
      photo_url: photo_url,
      friends: friends
    })
  })
  .then(user_id => user_id.json())
  .catch(error => console.error(error));
}

//----------Get a User by ID---------//
export function getUserById(user_id) {
  return fetch('/api/users/' + user_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(user => user.json())
  .catch(error => console.error(error));
}

//-----------get all games from db--------------//
export function gameList() {
  return fetch('/api/games', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(games => games.json())
  .catch(error => console.error(error));
}

//-------get players in a certain game---------//
export function userList(gameId) {
  return fetch('/api/games/' + gameId + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(players => players.json())
  .catch(error => console.error(error));
}

//------- updates game status -------------------//
export function updateGameStatus(gameId, status) {
  return fetch('/api/gameStatus', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
      status: status
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

//------- updates players' statuses at game end--------//
export function gameEnd(game_id) {
  return fetch('/api/games/end', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      game_id: game_id
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

//----------Get a Game by ID---------//
export function getGameById(gameId) {
  return fetch('/api/games/' + gameId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(game => game.json())
  .catch(error => console.error(error));
}

//------------Deletions-------------------//
export function deleteGameById(gameId) {
  return fetch('/api/games', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gameId: gameId,
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

export function deleteUserById(user_id) {
  return fetch('/api/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

export function deleteSessionByUserId(user_id) {
  return fetch('/api/sessions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}
//-----------------------------------------//

export function resetUser(user_id) {
  return fetch('/api/resetUser', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
    })
  })
  .then(data => data.json())
  .catch(error => console.error(error));
}

//-----------get all sessions from db--------------//
export function getSessions() {
  return fetch('/api/sessions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(sessions => sessions.json())
  .catch(error => console.error(error));
}
