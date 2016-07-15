var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var history = require('connect-history-api-fallback');
var db = require('./db');

module.exports = app;

app.use(bodyParser.json());

// taking accessCode from request body, create new game record in db
app.post('/api/newGame', (req, res) => {
  db('games').insert({
    access_code: req.body.accessCode,
    status: 'waiting'
  })
    .then(gameId => {
      res.send(gameId)
    })
});

// taking gameId and username from request body, create new user record in db
app.post('/api/newUser', (req, res) => {
  db('users').insert({
    game_id: req.body.gameId,
    name: req.body.name,
    score: 0,
    status: 'waiting'
  })
    .then(userId => {
      res.send(userId)
    })
});

// returns array of game objects
app.get('/api/gameList', (req, res) => {
  db.select('*').from('games')
    .then(rows => {
      res.send(rows);
    });
});

// returns array of player objects that match a given gameId
app.post('/api/userList', (req, res) => {
  db('users').where('game_id', req.body.gameId)
    .then(rows => {
      res.send(rows);
    });
});

// returns the game that matches a given gameId
app.post('/api/getGameById', (req, res) => {
  db('games').where('id', req.body.gameId)
    .then(rows => {
      res.send(rows);
    });
});

// updates game status that matches a given gameId
app.post('/api/gameStatus', (req, res) => {
  db('games').where('id', req.body.gameId).update('status', req.body.status)
    .then()
});

// updates user status that matches a given userId
app.post('/api/userStatus', (req, res) => {
  db('users').where('id', req.body.userId).update('status', req.body.status)
    .then();
});

//------------ post player throw-------------//
//--------------------------------------------//
// updates user status (with throw) that matches a given userId
app.post('/api/users', (req,res) => {
  let move = req.body.move;
  let userId = req.body.userId;

  // insert the move under status where id === userId
  db('users').where('id', userId).update({status: move})
    .then(() => {
      console.log(`Inserted ${move} into Users at userId: ${userId}`)
      res.send({move});
	    // res.sendStatus(200);
    })
    .catch(function (err) {
      console.error(err);
      res.sendStatus(500);
    });
});

//------------ Get Opponent Status -----------//
//--------------------------------------------//

app.post('/api/opponentMove', (req, res) => {
  // in users table, where game id matches and userid does not,
  // select status
  db('users')
      .where('game_id', req.body.gameId)
      .whereNot('id',   req.body.userId)
      .select('status')
    .then(status => {
      console.log(status);
      res.send(status);
    })
    .catch(function(err){
      console.log(err);
    });
});


// use history api fallback middleware after defining db routes
// to not interfere get requests
app.use(history());
app.use(express.static(path.join(__dirname, "../client/public")));


app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

//  socket.io is listening for queues triggered by
//    players, then emits information to both

io.on('connection', function(socket){
	socket.on('join game', gameId => {
		io.emit('join game', gameId)
	})

	socket.on('start game', gameId => {
		io.emit('start game', gameId)
	})
})

var port = process.env.PORT || 4000;
http.listen(port);
console.log("Listening on localhost:" + port);
