'use strict'

const store = require('../store')

const onCreateSuccess = function (response) {
  $('#message').text('Game Start')
  // console.log('create game', response.game)
  store.serverGame = response.game
  // console.log('store on create', store)
  store.game.showGameBoard()
}

const onCreateFailure = function () {
  $('#message').text('Fail to Create Game')
}

const onUpdateGameSuccess = function () {
  $('#message').text('Successfully Update Game')
  // console.log('Updated')
  // update the logic game board and change turn
  store.game.updateGameBoard()
}

const onUpdateGameFailure = function () {
  $('#message').text('Fail to Update Game')
  // console.log('fail to update')
}

const onGetGameSuccess = function (response) {
  $('#message').text('Successfully Get Game')
  response = JSON.parse(JSON.stringify(response))
  // console.log('Successfully Get Game', response)
  store.game.retrievedGame(response)
}

const onGetGameFailure = function () {
  $('#message').text('Fail to Get Game')
}

const onOverSuccess = function () {
  $('#message').text('Game Over')
  store.game.gameOver()
}

const onOverFailure = function () {
  $('#message').text('Fail to Update Game Over')
}

const onGetAllGamesSuccess = function (response) {
  $('#message').text('Get All Games Successfully')
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
