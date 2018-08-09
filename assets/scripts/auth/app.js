'use strict'

const authEvents = require('./events.js')

const addHandlers = function () {
  $().on('submit', onSignUp)
  $().on('submit', onSignIn)
  $().on('submit', onSignOut)
  $().on('submit', onChangePassword)
}
