const express = require('express')
const morgan = require('morgan')
const CORS = require('@configs/cors')
const auth = require('./authRoute')
const user = require('./userRoute')
const { setRouter } = require('@utils')
const { Message } = require('@messages')

const routes = (app) => {
  // mostrar o status das routas
  app.use(morgan('dev'))

  // cors => Cross-Origin Resources Shares
  app.use(CORS)

  // filtrar o tipo de requisição
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // routes
  app.use(setRouter('auth'), auth)
  app.use(setRouter('user'), user)

  // se a rota não existir gera um erro
  app.use((req, res, next) => {
    const error = new Error('Not Found!')
    error.status = 404
    next(error)
  })

  // pega o erro gerado e retorna
  app.use((error, req, res, next) => Message.send(error, req, res))
}

module.exports = routes
