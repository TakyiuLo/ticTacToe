'use strict'

const store = require('../store')
const game = require('./game')

const onCreateSuccess = function (response) {
  $('#game-board').removeClass('hidden')
  $('.board-row div').text('')
  $('.message').text('Player(X)\'s Plays first')
  game.newGame()
  store.game = game
  store.serverGame = response.game
  $('.board-row div').off('click').on('click', store.events.boxClick)
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
  // const cell = '#cell' + store.playerIndex
  // $(cell).html('<span>' + response.game.cells[store.playerIndex] + '</span>')
  // update the entire game to prevent board bugs
  store.game.board = response.game.cells
  for (let i = 0; i < response.game.cells.length; i++) {
    $('#cell' + i).html('<span>' + response.game.cells[i] + '</span>')
  }
  // $(cell).off('click')
  // check is there a winner
  store.game.checkWinner()
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
  // $('.message').text('Get All Games Successfully')
  $('.game-count-message').text('Number of Games: ' + response.games.length)
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
