'use strict'

const config = require('../config')
const store = require('../store')

// create action
const createGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

// update action
const updateGame = function (data) {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.serverGame.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

// show action
const getGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.serverGame.id,
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

// show all action
const getAllGames = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createGame,
  updateGame,
  getGame,
  getAllGames
}
