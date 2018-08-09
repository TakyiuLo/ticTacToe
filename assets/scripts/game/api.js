'use strict'

const config = require('../config')
const store = require('../store')

const createGame = function () {
  // Don't have auth yet

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createGame
}
