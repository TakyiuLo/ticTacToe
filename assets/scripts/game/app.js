'use strict'

const store = require('../store')
const events = require('./events')

// _WARNING: read this first, orders of operation matters very much for this
// perticular app. A different order will cause more bugs.
// If we update the server game before update the game logic it means to be lag
const boxClick = function (event) {
  // prevent event to ajax things multiply times
  event.preventDefault()
  // check if the game have been created
  if (store.serverGame === undefined) {
    console.log('game haven\'t create yet')
    return
  }
  // check if a cell had been clicked
  console.log($(event.target).attr('clickedOnce'))
  if ($(event.target).attr('clickedOnce') === 'true') {
    /* counter measures */
    console.log('clicked once')
    return
  }
  $(event.target).off('click') // if more bugs shows, use this line
  // mark cells that are clicked
  $(event.target).attr('clickedOnce', 'true')

  // This check if the cell is taken.
  // Why are we going through all this trouble? Because we are doing a visible
  // board with an asynchronous timer on it and we also wanted to have clickable
  // event that can handles a clicked spot. More future features might come so
  // we are preparing.
  // Also we are checking it with local copy of game board because the server game
  // board is slow to update so we couldn't afford to wait until it update our
  // local server gameboard.
  const index = parseInt(event.target.id.substring(4), 10)
  store.playerIndex = index
  if (store.game.board[index] === 'X' || store.game.board[index] === 'O') {
    console.log('spot choosen')
    return
  }
  const data = {
    game: {
      cell: {
        index: index,
        value: store.game.whosTurn
      }
    }
  }
  // You got to update the logic first(but not the ui) because the request
  // isn't fast enough to update the logic afterward which means a click on
  // other cell will think that they are still X and triggers thier corresponded
  // cell-click event. This usually happens at the start of a new game.
  // You also got to do this after you saved the current player because chooseCell
  // will change to next player instantly.
  console.log('game cell', store.game.board[index])
  store.game.chooseCell()

  // Again, because updating the server is slow, we might get updating a winning
  // game before a cell been update. To prevent this, we check the local game
  if (store.game.isOver) {
    return
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
  $('#game-status-bar').text('Game Status')
}

module.exports = {
  startGameProcedures,
  quitGameProcedures
}
