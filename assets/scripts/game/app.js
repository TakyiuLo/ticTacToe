'use strict'

const game = require('./game')

const clicked = function (event) {
  game.chooseCell(event.target)
}

const newGame = function () {
  game.newGame()
  // May need to clean events first if newGame button is avaliable while playing
  // $('#cell1, #cell2, #cell3, #cell4, #cell5, #cell6, #cell7, #cell8, #cell9').off('click')
  // Map each cell clicks
  $('.board-row div').on('click', clicked)
  // hide newGame button twice first time but it will be removed after that
  $('#new-game').addClass('hidden')
}

const startGame = function () {
  game.start()
  $('.board-row div').on('click', clicked)
  $('#start-game').addClass('hidden')
}

const getHistory = function () {
  game.getAllGames()
}

const addHandlers = function () {
  // Mapping new Game button
  $('#new-game').on('click', newGame)
  // Mapping history button
  // $('#history').on('click', getHistory)
  // appears when started game
  getHistory()
  // Mapping start game button
  $('#start-game').on('click', startGame)
}

const startGameProcedures = function () {
  addHandlers()
}

module.exports = {
  startGameProcedures
}
