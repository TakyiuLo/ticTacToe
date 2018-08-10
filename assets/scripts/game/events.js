'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateGame = function () {
  api.createGame()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
}

const onUpdateGame = function (data) {
  api.updateGame(data)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}

const onGetGame = function () {
  api.getGame()
    .then(ui.onGetGameSuccess)
    .catch(ui.onGetGameFailure)
}
const onUpdateGameOver = function (data) {
  api.updateGame(data)
    .then(ui.onOverSuccess)
    .catch(ui.onOverFailure)
}

module.exports = {
  onCreateGame,
  onUpdateGame,
  onGetGame,
  onUpdateGameOver
}
