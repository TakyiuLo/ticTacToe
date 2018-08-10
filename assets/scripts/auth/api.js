'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signUp = function (data) {
  // console.log('data in signUp', data)
  // console.log(config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  // console.log('data in signIn', data)
  // console.log(config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  // console.log('data in changePassword', data)
  // console.log('store in changePassword', store)
  // console.log(config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function () {
  // console.log('store in signOut', store)
  // console.log(config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
