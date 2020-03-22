const express = require('express')
const morgan = require('morgan')
const CORS = require('@configs/cors')
const auth = require('./auth')
const { setRouter } = require('@utils')

const routes = app => {
  // mostrar o status das routas
  app.use(morgan('dev'))

  // cors => Cross-Origin Resources Shares
  app.use(CORS)

  // filtrar o tipo de requisição
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // auth routes
  app.use(setRouter('auth'), auth)

  // se a rota não existir gera um erro
  app.use((req, res, next) => {
    const error = new Error('Not Found!')
    error.status = 404
    next(error)
  })

  // pega o erro gerado e notifica
  app.use((error, req, res, next) => res.status(error.status).json(error))
}

module.exports = routes
