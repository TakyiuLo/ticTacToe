'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authApp = require('./auth/app')
const store = require('./store')
const gameApp = require('./game/app')

$(() => {
  // your JS code goes here
  authApp.addHandlers()
  store.events = {}
  store.events.startGameProcedures = gameApp.startGameProcedures
  store.events.quitGameProcedures = gameApp.quitGameProcedures

  $('#title h1 span').off('click').on('click', () => {
    $('#title').toggleClass('active')
    $('#credentials-message').toggleClass('active')
    $('.credentials').toggleClass('active')
  })
})
