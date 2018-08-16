'use strict'

const store = require('../store')
const game = require('./game')

const onCreateSuccess = function (response) {
  // lock cells... there is probably a better to do this but...
  // console.log('create game', response.game)

  // console.log('store on create', store)
  // turns cells on back on

  // game board
  $('#game-board').removeClass('hidden')
  // $('#game-board').toggleClass('game-fadein')
  // clear cell texts
  $('.board-row div').text('')
  // $('.board-row div').css('pointer-events', 'none')
  setTimeout(function () {
    $('.message').text('Game Start in ' + 3)
  }, 500)
  setTimeout(function () {
    $('.message').text('Game Start in ' + 2)
  }, 1000)
  setTimeout(function () {
    $('.message').text('Game Start in ' + 1)
  }, 1500)

  // clean status game bar
  // $('#game-status-bar').text('Game Status')
  // set message to player x plays first
  setTimeout(function () {
    $('.message').text('Player(X)\'s Plays first')
    // unlock cells... there is probably a better to do this but...
    // $('.board-row div').css('pointer-events', '')
    // add game handlers
    // store.events.addGamesHandlers()
    // create logical game
    game.newGame()
    store.game = game
    // Map each cell clicks
    store.serverGame = response.game
  }, 2000)
}

const onCreateFailure = function () {
  $('.message').text('Fail to Create Game')
}

const onUpdateGameSuccess = function (response) {
  $('.message').text(function () {
    return store.game.whosTurn === 'X' ? 'Player(O)\'s Turn' : 'Player(X)\'s Turn'
  })
  // console.log('Updated')
  // change html cell to correct text ('X' or 'O')
  const cell = '#cell' + store.playerIndex
  $(cell).html('<span>' + response.game.cells[store.playerIndex] + '</span>')
  // $(cell).off('click')
}

const onUpdateGameFailure = function () {
  $('.message').text('Fail to Update Game')
  // console.log('fail to update')
}

const onGetGameSuccess = function (response) {
  $('.message').text('Successfully Get Game')
  response = JSON.parse(JSON.stringify(response))
  // console.log('Successfully Get Game', response)
}

const onGetGameFailure = function () {
  $('.message').text('Fail to Get Game')
}

const onOverSuccess = function () {
  $('.message').text(function () {
    return store.game.winner !== 'draw' ? 'Game Over Player(' + store.game.winner + ') Win' : 'Draw'
  })
  $('.board-row div').off('click')
  // $('#game-status-bar').text('GAME OVER, The Winner is ' + store.game.winner)
  $('#new-game').removeClass('hidden')
  store.serverGame = undefined
}

const onOverFailure = function () {
  $('.message').text('Fail to Update Game Over')
}

const onGetAllGamesSuccess = function (response) {
  $('.message').text('Get All Games Successfully')
  $('#game-count').text('Number of Games: ' + response.games.length)
  // console.log('Get All games', response)
}

const onGetAllGamesFailure = function () {
  $('.message').text('Fail to Get All Game')
}

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onGetGameSuccess,
  onGetGameFailure,
  onOverSuccess,
  onOverFailure,
  onGetAllGamesSuccess,
  onGetAllGamesFailure
}
