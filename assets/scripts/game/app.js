'use strict'

const game = require('./game')
const store = require('../store')

const clicked = function (event) {
  // prevent event to ajax things twice
  event.preventDefault()
  game.chooseCell(event.target)
}

const newGame = function () {
  // hide newGame button twice first time but it will be removed after that
  $('#new-game').addClass('hidden')
  store.game.newGame()
  // Map each cell clicks
  $('.board-row div').off('click')
  $('.board-row div').on('click', clicked)
}

const startGame = function () {
  $('#start-game').addClass('hidden')

  // double game
  // console.log(game)
  // store game in store.js to prevent circular dependencies
  // and because object is a reference type, changes in store.game will also
  // change the game object
  store.game = game
  store.game.start()
}

const getHistory = function () {
  store.game.getAllGames()
}

const addHandlers = function () {
  // Mapping new Game button
  $('#new-game').on('click', newGame)
  // Mapping history button
  // $('#history').on('click', getHistory)
  // appears when started game
  // getHistory()
  // Mapping start game button
  $('#start-game').on('click', startGame)

  // Map each cell clicks
  $('.board-row div').on('click', clicked)
}

const startGameProcedures = function () {
  addHandlers()
}

const quitGameProcedures = function () {
  // remove Authorization
  store.user = {}
  // check if there is a game before signing out
  if (store.game) {
    // remove Game while I am playing
    store.game.refreshGame()
    // console.log(store)
  }
  // clean UI
  $('#start-game').removeClass('hidden')
  // THIS IS IMPORTANT: because there can be multiple clicked event for it
  $('#start-game').off('click')
  // When there is a on, there must be a off especially when it invokes a ajax
  // call. Otherwise there will have multiple click event that can trigger all
  // at the same time.
  $('#new-game').off('click')
  $('#new-game').addClass('hidden')
  $('#game-board').addClass('hidden')
  // May need to clean events first if newGame button is avaliable while playing
  $('.board-row div').off('click')
  $('.board-row div').text('')
  $('#game-status-bar').text('Game Status')
}

module.exports = {
  startGameProcedures,
  quitGameProcedures
}
