'use strict'

const store = require('../store')
const events = require('./events')

const boxClick = function (event) {
  // prevent event to ajax things multiply times
  event.preventDefault()
  if ($(event.target).attr('clickedOnce') === 'true') {
    /* counter measures */
    return
  }
  $(event.target).attr('clickedOnce', 'true')
  const index = event.target.id.substring(4)
  store.playerIndex = index
  const data = {
    game: {
      cell: {
        index: index,
        value: store.game.whosTurn
      }
    }
  }
  events.onUpdateGame(data)
}

const newGame = function () {
  $('#new-game').addClass('hidden')
  $('.board-row div').attr('clickedOnce', 'false')
  events.onCreateGame()
}

const startGame = function () {
  $('#start-game').addClass('hidden')
  $('.board-row div').attr('clickedOnce', 'false')
  // $('#game-status-bar').removeClass('hidden')
  events.onCreateGame()
  store.events.updateGameOver = events.onUpdateGameOver
}

const addHandlers = function () {
  // Mapping new Game button
  $('#new-game').off('click').on('click', newGame)
  // Mapping start game button
  $('#start-game').off('click').on('click', startGame)
  // Map each cell clicks
  $('.board-row div').on('click', boxClick)
  // sidebar
  $('.sidebar-toggle').off('click').on('click', function () {
    $('.sidebar').toggleClass('active')
    // console.log('clicked')
  })
}

const startGameProcedures = function () {
  addHandlers()
  events.onGetAllGames()
  // Mapping Game Count
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
  // hide game board
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
