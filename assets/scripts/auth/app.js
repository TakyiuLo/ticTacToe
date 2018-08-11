'use strict'

const events = require('./events.js')

const addHandlers = function () {
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('click', events.onSignOut)
}
module.exports = {
  addHandlers
}
