'use strict'

const store = require('../store')

const onCreateSuccess = function (response) {
  $('#message').text('Game Start')
  // console.log('create game', response.game)
  store.serverGame = response.game
  // console.log('store on create', store)
  $('#game-board').removeClass('hidden')
  // clear cell texts
  $('.board-row div').text('')
  // clean status game bar
  $('#game-status-bar').text('Game Status')
}

const onCreateFailure = function () {
  $('#message').text('Fail to Create Game')
}

const onUpdateGameSuccess = function (response) {
  $('#message').text('Successfully Update Game')
  // console.log('Updated')
  // change html cell to correct text ('X' or 'O')
  const cell = '#cell' + (store.playerIndex + 1)
  $(cell).text(store.game.whosTurn)
  $(cell).off('click')
  // update the logic game board and change turn
  store.game.updateGamelogic(response.game)
}

const onUpdateGameFailure = function () {
  $('#message').text('Fail to Update Game')
  // console.log('fail to update')
}

const onGetGameSuccess = function (response) {
  $('#message').text('Successfully Get Game')
  response = JSON.parse(JSON.stringify(response))
  console.log('Successfully Get Game', response)
}

const onGetGameFailure = function () {
  $('#message').text('Fail to Get Game')
}

const onOverSuccess = function () {
  $('#message').text('Game Over')
  $('.board-row div').off('click')
  $('#game-status-bar').text('GAME OVER, The Winner is ' + store.game.winner)
  $('#new-game').removeClass('hidden')
}

const onOverFailure = function () {
  $('#message').text('Fail to Update Game Over')
}

const onGetAllGamesSuccess = function (response) {
  $('#message').text('Get All Games Successfully')
  $('#game-count').text('Number of Games: ' + response.games.length)
  // console.log('Get All games', response)
}

const onGetAllGamesFailure = function () {
  $('#message').text('Fail to Get All Game')
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
