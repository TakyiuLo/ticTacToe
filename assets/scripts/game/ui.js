'use strict'

const store = require('../store')
const game = require('./game.js')

const onCreateSuccess = function (response) {
  $('#message').text('Game Start')
  store.game = response.game
  console.log(store.game)
}

const onCreateFailure = function () {
  $('#message').text('Create Game Fail')
}

module.exports = {
  onCreateSuccess,
  onCreateFailure
}
