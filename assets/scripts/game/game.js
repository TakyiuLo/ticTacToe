'use strict'

const events = require('./events')

const game = {
  // This is the default game object
  board: ['', '', '', '', '', '', '', '', ''],
  whosTurn: 'X',
  isOver: false,
  winner: '',
  winningCells: [],
  isGameOver: function () {
    if (this.isOver) {
      this.gameOver()
    }
    return this.isOver
  },
  gameOver: function () {
    // game over procedures
    console.log('game over, Winner is', this.winner)
    $('.board-row div').off('click')
  },
  equalVals: function (element, index, array) {
    return element === array[0] && array[0] !== ''
  },
  checkWinner: function () {
    // diagonals check
    const blackslash = [this.board[0], this.board[4], this.board[8]]
    const slash = [this.board[2], this.board[4], this.board[6]]
    // rows check
    const row1 = [this.board[0], this.board[1], this.board[2]]
    const row2 = [this.board[3], this.board[4], this.board[5]]
    const row3 = [this.board[6], this.board[7], this.board[8]]
    // columns check
    const col1 = [this.board[0], this.board[3], this.board[6]]
    const col2 = [this.board[1], this.board[4], this.board[7]]
    const col3 = [this.board[2], this.board[5], this.board[8]]

    if (blackslash.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [0, 4, 8]
    } else if (slash.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [2, 4, 6]
    } else if (row1.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [0, 1, 2]
    } else if (row2.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [3, 4, 5]
    } else if (row3.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [6, 7, 8]
    } else if (col1.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [0, 3, 6]
    } else if (col2.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [1, 4, 7]
    } else if (col3.every(this.equalVals)) {
      this.winner = this.whosTurn
      this.winningCells = [2, 5, 8]
    }

    if (this.winner !== '') {
      // console.log(this.winner)
      this.isOver = true
    }
    // check is it a draw
    if (this.board.every(element => element !== '') && this.winner !== 'X') {
      this.winner = 'draw'
      this.isOver = true
    }
  },
  start: function () {
    // so choose cell
    events.onCreateGame()
  },
  changeTurn: function () {
    this.whosTurn = this.whosTurn === 'X' ? 'O' : 'X'
  },
  chooseCell: function (cell) {
    // args:
    //  - cell: board cell, a html element
    //      - Example of cell: <div id="cell4"></div>
    // use console.log('before', JSON.parse(JSON.stringify(game))) to
    // show before and after game has change for reference type
    const index = cell.id.substring(4) - 1
    this.board[index] = this.whosTurn

    if (this.whosTurn === 'X') {
      $(cell).text(this.whosTurn)
      $(cell).off('click')
    } else {
      $(cell).text(this.whosTurn)
      $(cell).off('click')
    }
    // give checkWinner the board index of the current cell
    this.checkWinner()
    this.isGameOver()
    this.changeTurn()
  },
  newGame: function () {
    /*
       board: ['', '', '', '', '', '', '', '', ''],
       whosTurn: 'X',
       isOver: false,
       winner: '',
       winningCells: []
     */
    this.board = ['', '', '', '', '', '', '', '', '']
    this.whosTurn = 'X'
    this.isOver = false
    this.winner = ''
    this.winningCells = []
    this.start()
    return Object.assign({}, this)
  }
}

const start = function () {
  return game.newGame()
}

module.exports = {
  start,
  game
}
