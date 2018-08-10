'use strict'

const game = require('./game')

const clicked = function (event) {
  game.chooseCell(event.target)
}

const addHandlers = function () {
  // Mapping each cell to click
  $('#cell1, #cell2, #cell3, #cell4, #cell5, #cell6, #cell7, #cell8, #cell9').on('click', clicked)
}

const startGame = function () {
  game.start()
  addHandlers()
}

module.exports = {
  startGame
}
