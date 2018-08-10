'use strict'

const store = require('../store.js')
const game = require('../game/app')

const signUpSuccess = function () {
  $('#message').text('Successfully Sign Up')
  $('#sign-up input').val('')
}
const signUpFail = function () {
  $('#message').text('Failed to Sign Up')
  $('#sign-up input').val('')
}

const signInSuccess = function (response) {
  store.user = response.user
  console.log(store.user)
  $('#signInStatus').text('Signed In')
  $('#message').text('Successfully Sign In')
  $('#credentials').addClass('collapse')
  $('#game').removeClass('collapse')
  $('#sign-in input').val('')
  // start Game Here //
  game.startGameProcedures()
}
const signInFail = function () {
  $('#message').text('Failed Sign In')
  $('#sign-in input').val('')
}

const changePasswordSuccess = function () {
  $('#message').text('Successfully Change Password')
  $('#change-password input').val('')
}
const changePasswordFail = function () {
  $('#message').text('Failed to Change Password')
  $('#change-password input').val('')
}

const signOutSuccess = function () {
  $('#signInStatus').text('Not Signed In')
  $('#message').text('Successfully Sign Out')
  $('#credentials').removeClass('collapse')
  $('#game').addClass('collapse')
  // remove Authorization
  store.user = {}
  // remove Game while I am playing
  game.endGame()
}
const signOutFail = function () {
  $('#message').text('Failed to Sign Out')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePasswordSuccess,
  changePasswordFail,
  signOutSuccess,
  signOutFail
}
