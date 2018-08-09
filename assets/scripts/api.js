'use strict'

const config = require('./config.js')

const createGame = function () {
  console.log('createGame')

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    data: {}
  })
}

module.exports = {
  createGame
}
