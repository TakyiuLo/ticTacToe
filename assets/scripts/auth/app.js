'use strict'

const events = require('./events.js')

const addHandlers = function () {
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('.sign-out').on('click', events.onSignOut)
  addSplashScreen()
}

const addSplashScreen = function () {
  // first page animation
  $('#title h1 span').off('click').on('click', () => {
    $('#title').toggleClass('active')
    $('#credentials-message').toggleClass('active')
    $('.credentials').toggleClass('active')
  })
}

module.exports = {
  addHandlers
}
