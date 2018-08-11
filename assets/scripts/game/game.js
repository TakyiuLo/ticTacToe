'use strict'

const events = require('./events')
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
    const data = {
      game: {
        over: true
      }
    }
    events.onUpdateGameOver(data)

    console.log('game over, Winner is', this.winner)
    // UI will call on this function when Successfully update the server for
    // game over
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

    // console.log(this)
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
    // console.log('winner is', this.winner)
    // if there is a winner
    if (this.winner !== '') {
      // check is it a draw
      if (this.board.every(element => element !== '') && this.winner !== 'X') {
        this.winner = 'draw'
      }
      // there is a winner so we'll end the game
      this.gameOver()
    } else {
      // server doesn't have turns so we need to manually change turn
      this.changeTurn()
    }
  },
  start: function () {
    // console.log('Game start', this)
    events.onCreateGame()
  },
  changeTurn: function () {
    this.whosTurn = this.whosTurn === 'X' ? 'O' : 'X'
    // console.log('changed turn')
  },
  chooseCell: function (cell) {
    // args:
    //  - cell: board cell, a html element
    //      - Example of cell: <div id="cell4"></div>
    // use console.log('before', JSON.parse(JSON.stringify(game))) to
    // show before and after game has change for reference type
    const index = cell.id.substring(4) - 1

    const data = {
      game: {
        cell: {
          index: index,
          value: this.whosTurn
        }
      }
    }
    store.playerIndex = index
    // update the game
    events.onUpdateGame(data)
  },
  updateGamelogic: function (serverGame) {
    // this function is to retrieve data from server to update game board
    this.board = serverGame.cells
    this.isOver = serverGame.over
    // check winner after we retrieved game from server
    this.checkWinner()
  },
  getAllGames: function () {
    events.onGetAllGames()
  },
  endGame: function () {
    // This function is use when people wanted to force quit the games
    // for instance, sign out while playing game
    this.board = ['', '', '', '', '', '', '', '', '']
    this.whosTurn = 'X'
    this.isOver = false
    this.winner = ''
    this.winningCells = []
  },
  newGame: function () {
    this.endGame()
    this.start()
  }
}

module.exports = gameObject
