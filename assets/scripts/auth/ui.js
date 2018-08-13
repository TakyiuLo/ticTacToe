'use strict'

const store = require('../store.js')
const gameApp = require('../game/app')

const signUpSuccess = function () {
  $('.message').text('Successfully Sign Up')
  $('#sign-up input').val('')
}
const signUpFail = function () {
  $('.message').text('Failed to Sign Up')
  $('#sign-up input').val('')
}

const signInSuccess = function (response) {
  store.user = response.user
  // console.log(store.user)
  $('#signInStatus').text('Signed In')
  $('.message').text('Successfully Sign In')
  $('#credentials').addClass('hidden')
  $('#game').removeClass('hidden')
  $('#sign-in input').val('')
  $('.wrapper').removeClass('hidden')

  // start Game Here //
  store.events.startGameProcedures()
}
const signInFail = function () {
  $('.message').text('Failed Sign In')
  $('#sign-in input').val('')
}

const changePasswordSuccess = function () {
  $('.message').text('Successfully Change Password')
  $('#change-password input').val('')
}
const changePasswordFail = function () {
  $('.message').text('Failed to Change Password')
  $('#change-password input').val('')
}

const signOutSuccess = function () {
  $('#signInStatus').text('Not Signed In')
  $('.message').text('Successfully Sign Out')
  $('#credentials').removeClass('hidden')
  $('#game').addClass('hidden')
  $('.wrapper').addClass('hidden')
  // quit game

  store.events.quitGameProcedures()
}

const signOutFail = function () {
  $('.message').text('Failed to Sign Out')
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
