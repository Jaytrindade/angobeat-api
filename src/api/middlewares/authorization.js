const jwt = require('jsonwebtoken')
const jagile = require('jsoft-agile')
const funcs = require('@utils')
const { Message, Errors } = require('@messages')

module.exports = {
  private: (req, res, next) => {
    const token = req.body.token || req.headers.authorization

    if (jagile.hasValue(token)) {
      const opt = {
        issuer: process.env.TOKEN_ISSUER,
        subject: process.env.TOKEN_SUBJECT,
        audience: process.env.TOKE_AUDIENCE,
        expiresIn: process.env.TOKEN_EXPIRES_IN,
        algorithm: process.env.TOKEN_ALGORITHM,
      }
      jwt.verify(
        token,
        process.env.TOKEN_PRIVATE_HASH_KEY,
        opt,
        (err, user) => {
          if (err) Message.send(Errors.request('session'), req, res)
          else {
            req.USER_SESSION = user
            const missing = (user.exp - new Date().getTime()) / 1000
            const missingToTime = funcs.convertDurationToTime(missing)
            const updateIn = process.env.TOKEN_UPDATE_IN
            let missingToHours = missingToTime.split(':')

            if (missingToHours.length === 3) {
              missingToHours = Number(missingToHours[0])
            } else missingToHours = 1

            if (missingToHours <= updateIn) {
              const userIf = { uid: user.uid, user: user.user, type: user.type }
              const newToken = funcs.setToken(userIf)
              req.NEW_TOKEN = newToken
            }

            next()
          }
        }
      )
    } else Message.send(Errors.request('session'), req, res)
  },
  privateUpload: (req, res, next) => {
    const token = req.headers['upload-token']

    if (funcs.hasValue(token)) {
      if (token === process.env.TOKEN_UPLOAD) next()
      else Message.send(Errors.request('session'), req, res)
    } else Message.send(Errors.request('session'), req, res)
  },
  admin: (req, res, next) => {
    const token = req.body.token || req.headers.authorization

    if (jagile.hasValue(token)) {
      const opt = {
        issuer: process.env.TOKEN_ISSUER,
        subject: process.env.TOKEN_SUBJECT,
        audience: process.env.TOKE_AUDIENCE,
        expiresIn: process.env.TOKEN_EXPIRES_IN,
        algorithm: process.env.TOKEN_ALGORITHM,
      }
      jwt.verify(
        token,
        process.env.TOKEN_PRIVATE_ADMIN_HASH_KEY,
        opt,
        (err, user) => {
          if (err) Message.send(Errors.request('session'), req, res)
          else {
            req.USER_SESSION = user
            const missing = (user.exp - new Date().getTime()) / 1000
            const missingToTime = funcs.convertDurationToTime(missing)
            const updateIn = process.env.TOKEN_UPDATE_IN
            let missingToHours = missingToTime.split(':')

            if (missingToHours.length === 3) {
              missingToHours = Number(missingToHours[0])
            } else missingToHours = 1

            if (missingToHours <= updateIn) {
              const userIf = { uid: user.uid, user: user.user, type: user.type }
              const newToken = funcs.setToken(userIf)
              req.NEW_TOKEN = newToken
            }

            next()
          }
        }
      )
    } else Message.send(Errors.request('session'), req, res)
  },
  adminAccess: (req, res, next) => {
    const access = req.headers['admin-access']
    if (jagile.hasValue(access) && access === process.env.ADMIN_ACCESS_HASH) {
      next()
    } else Message.send(Errors.set({ message: 'Acesso negado!' }), req, res)
  },
}
