const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const configRoutes = require('@configs/routes')
const { allowedCharNames } = require('./allowedCharNames')

module.exports = {
  setRouter: (name) => `${configRoutes.apiUrl}/${name}`,
  filterSearch: (value) => {
    const regExp = /[^a-zA-Z0-9_]/gi
    const splited = value.split(' ')

    splited.forEach((element, index) => {
      splited[index] = element.replace(regExp, (match) => {
        match = match.trim()
        const char = allowedCharNames[match]
        return char || ''
      })
    })

    return splited.join(' ').toLowerCase()
  },
  setHashPassword: (password) =>
    bcrypt.hashSync(password, Number(process.env.PASSWORD_HASH_CODE)),
  isSamePassowrd: (password, passwordHash) =>
    bcrypt.compareSync(password, passwordHash),
  // create cookie or token :<string>
  setToken: (user) => {
    const dateInit = new Date()
    const timestumpInit = dateInit.getTime()
    const minInit = dateInit.getMinutes()
    const timestumpEnd = new Date().setHours(
      process.env.TOKEN_EXPIRES_IN,
      minInit
    )
    user.iat = timestumpInit
    user.exp = timestumpEnd
    return jwt.sign(user, process.env.TOKEN_PRIVATE_HASH_KEY, {
      issuer: process.env.TOKEN_ISSUER,
      subject: process.env.TOKEN_SUBJECT,
      audience: process.env.TOKEN_AUDIENCE,
      algorithm: process.env.TOKEN_ALGORITHM,
    })
  },
  convertDurationToTime: (duration) => {
    const secNum = parseInt(duration, 10)
    let hours = Math.floor(secNum / 3600)
    let minutes = Math.floor((secNum - hours * 3600) / 60)
    let seconds = secNum - hours * 3600 - minutes * 60

    if (hours > 0) hours = hours + ':'
    else hours = ''
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    return hours + '' + minutes + ':' + seconds
  },
}
