'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./events')
const authApp = require('./auth/app')

$(() => {
  // your JS code goes here

  const game = {
    // This is the default game object
    board: ['', '', '', '', '', '', '', '', ''],
    whosTurn: 'X',
    isGameOver: function () {
      return this.checkWinner()
    },
    checkWinner: function () {
      return false
    },
    start: function () {
      // x goes first
      // so choose cell
      events.onCreateGame()
    },
    chooseCell: function (cell) {
      // args:
      //  - cell: game board index

      this.board[cell] = this.whosTurn
      this.whosTurn = this.whosTurn === 'X' ? 'O' : 'X'
      this.checkWinner()
    },
    newGame: function () {
      return Object.assign({}, this)
    }
  }

  // Cloning a new object to game1 because Object is a reference type, and
  // doing this will save the default game set up
  const game1 = game.newGame()
  game1.start()

  const clicked = function (event) {
    console.log('cell1 clicked', event.target)

    // // retreive a string of classes and bring the cell out from string
    // const regex = '(cell[0-9]*)'
    // const cell = $(event.target).attr('class').match(regex)[0]
    // // get the cell index
    // const index = parseInt(cell.substring(4)) - 1
    const index = event.target.id.substring(4) - 1
    console.log('index#:', index)

    game1.chooseCell(index)
    // game1.board = ['', '', '', '', '', '', '', '', '']
    // console.log('before', JSON.parse(JSON.stringify(game1)))
    // game1.board[index] = 'X'
    // console.log('after', JSON.parse(JSON.stringify(game1)))
  }

  // Mapping each cell to click
  $('#cell1, #cell2, #cell3, #cell4, #cell5, #cell6, #cell7, #cell8, #cell9').on('click', clicked)

  authApp.addHandlers()
})
