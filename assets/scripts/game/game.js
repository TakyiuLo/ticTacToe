'use strict'

const store = require('../store')

const gameObject = {
  // This is the default game object
  board: ['', '', '', '', '', '', '', '', ''],
  whosTurn: 'X',
  isOver: false,
  winner: '',
  winningCells: [],
  gameOver: function () {
    // game over procedures
    this.isOver = true
    const data = {
      game: {
        over: true
      }
    }

    // update the game isOver to server
    store.events.updateGameOver(data)

    // console.log('game over, Winner is', this.winner)
  },
  equalVals: function (element, index, array) {
    // This function is going to check if the entire array has the same value
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

    // winning conditions
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

    // check draw
    if (this.board.every(element => element !== '') && this.winner !== 'X') {
      this.winner = 'draw'
    }
    // if there is a winner
    if (this.winner !== '') {
      // there is a winner so we'll end the game
      this.gameOver()
    } else {
      // there is no winner so we'll change turn
      this.changeTurn()
    }
  },
  start: function () {
    // Game start store game object to store so it can be access
    store.game = this
  },
  changeTurn: function () {
    // change turn
    this.whosTurn = this.whosTurn === 'X' ? 'O' : 'X'
  },
  chooseCell: function (index) {
    // update the local gameBoard
    this.board[index] = this.whosTurn
    // check is there a winner
    // this.checkWinner()
  },
  updateGamelogic: function (serverGame) {
    // this function is to retrieve data from server to update game board
    this.board = serverGame.cells
    this.isOver = serverGame.over
    // check winner after we retrieved game from server
    this.checkWinner()
  },
  refreshGame: function () {
    // This function is use when people wanted to force quit the games
    // for instance, sign out while playing game
    this.board = ['', '', '', '', '', '', '', '', '']
    this.whosTurn = 'X'
    this.isOver = false
    this.winner = ''
    this.winningCells = []
  },
  newGame: function () {
    this.refreshGame()
    this.start()
  }
}

module.exports = gameObject
