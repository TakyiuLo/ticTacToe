'use strict'

const events = require('./events')
const store = require('../store')

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
    // console.log('game over, Winner is', this.winner)
    $('.board-row div').off('click')
    $('#game-status-bar').text('GAME OVER, The Winner is ' + this.winner)
    $('#new-game').removeClass('hidden')
    // UI will call on this function when Successfully update the server for
    // game over
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
      // this.isOver = true
      const data = {
        game: {
          over: true
        }
      }
      events.onUpdateGameOver(data)
    }
    // check is it a draw
    if (this.board.every(element => element !== '') && this.winner !== 'X') {
      this.winner = 'draw'
      const data = {
        game: {
          over: true
        }
      }
      events.onUpdateGameOver(data)
      // this.isOver = true
    }
  },
  start: function () {
    // console.log('Game start', this)
    // so choose cell
    events.onCreateGame()
    // store game in store to prevent circular dependencies
    store.game = this
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
    // this.board[index] = this.whosTurn

    // if (this.whosTurn === 'X') {
    //   // $(cell).text(this.whosTurn)
    //   // should update the server
    //   const data = {
    //     game: {
    //       cell: {
    //         index: index,
    //         value: this.whosTurn
    //       },
    //       over: this.isOver
    //     }
    //   }
    //   store.playerIndex = index
    //   // console.log(data)
    //   events.onUpdateGame(data)
    //   $(cell).off('click')
    // } else {
    //   // $(cell).text(this.whosTurn)
    //   $(cell).off('click')
    // }

    const data = {
      game: {
        cell: {
          index: index,
          value: this.whosTurn
        },
        over: this.isOver
      }
    }
    store.playerIndex = index
    // console.log(data)
    events.onUpdateGame(data)
    // manually turn cell to unclickable
    $(cell).off('click')
    // give checkWinner the board index of the current cell
    // this.checkWinner()
    // this.isGameOver()
    // this.changeTurn()
  },
  updateGameBoard: function () {
    // this function is to retrieve data from server to update game board
    events.onGetGame()
  },
  retrievedGame: function (response) {
    // this function invokes when we got the data from server
    this.board = response.game.cells
    // change html cell to correct text ('X' or 'O')
    $('#cell' + (store.playerIndex + 1)).text(this.whosTurn)
    // check winner after we retrive game from server
    this.checkWinner()
    this.isGameOver()
    // server doesn't have turns so we need to manually change turn
    store.game.changeTurn()
  },
  getAllGames: function () {
    events.onGetAllGames()
  },
  cleanUI: function () {
    // clear cell texts
    $('.board-row div').text('')
    // clean status game bar
    $('#game-status-bar').text('Game Status')
  },
  showGameBoard: function () {
    $('#game-board').removeClass('hidden')
  },
  endGame: function () {
    // This function is use when people wanted to force quit the games
    // for instance, sign out while playing game
    this.newGame()
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
    this.cleanUI()
    // console.log('game', game)
  }
}

module.exports = game
