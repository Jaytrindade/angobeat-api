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
}
