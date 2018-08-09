'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateGame = function () {
  api.createGame()
    .then(ui.onCreateSuccess)
    .catch(ui.onCreateFailure)
}

module.exports = {
  onCreateGame
}
