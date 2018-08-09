'use strict'

const config = require('../config.js')

const createGame = function () {
  // Don't have auth yet

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    data: {}
  })
}

module.exports = {
  createGame
}
