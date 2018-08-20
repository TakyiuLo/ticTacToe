'use strict'

const store = require('../store')
const events = require('./events')

const boxClick = function (event) {
  event.preventDefault()

  const index = parseInt(event.target.id.substring(4), 10)
  if (store.game.board[index] !== '') {
    // console.log('spot chosen')
  } else {
    $(event.target).off('click')
    store.playerIndex = index
    const data = {
      game: {
        cell: {
          index: index,
          value: store.game.whosTurn
        }
      }
    }
    store.game.chooseCell(index)
    events.onUpdateGame(data)
    // console.log(JSON.parse(JSON.stringify(store.game)))
  }
}

const newGame = function () {
  $('#new-game').addClass('hidden')
  events.onCreateGame()
}

const startGame = function () {
  $('#start-game').addClass('hidden')
  events.onCreateGame()
  store.events.updateGameOver = events.onUpdateGameOver
  store.events.boxClick = boxClick
}

const addHandlers = function () {
  // Mapping new Game button
  $('#new-game').off('click').on('click', newGame)
  // Mapping start game button
  $('#start-game').off('click').on('click', startGame)
  // Map each cell clicks
  $('.board-row div').off('click').on('click', boxClick)
  // sidebar
  $('.sidebar-toggle').off('click').on('click', function () {
    $('.sidebar').toggleClass('active')
    // console.log('clicked')
  })
}

const startGameProcedures = function () {
  addHandlers()
  // Mapping Game Count
  events.onGetAllGames()
  // when this start by ui, it will call this again which create
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
  $('.sidebar-toggle').off('click')
}

module.exports = {
  startGameProcedures,
  quitGameProcedures
}
