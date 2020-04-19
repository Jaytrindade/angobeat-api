const jagile = require('jsoft-agile')
const { Errors } = require('@messages')
const alloweds = require('@configs/alloweds')

// validando o nome
const name = (value) => {
  value = jagile.correctName(value)
  value = jagile.capitalizeText(value, true)
  const min = process.env.NAME_MIN_CHAR
  const max = process.env.NAME_MAX_CHAR
  if (
    jagile.checkMinAndMaxValueEachWord(value, min, max) &&
    jagile.isName(value)
  ) {
    return { ok: true, value }
  } else {
    return {
      ok: false,
      message: Errors.validate('limit-char', 'name').JsError.message,
    }
  }
}

// validando username
const username = (value) => {
  value = value.trim()
  const { USERNAME_MAX_CHAR, USERNAME_MIN_CHAR } = process.env
  if (
    jagile.checkMinValueEachWords(value, USERNAME_MIN_CHAR) &&
    jagile.checkMaxValueEachWords(value, USERNAME_MAX_CHAR) &&
    jagile.isUsername(value)
  ) {
    return { ok: true, value }
  } else {
    return { ok: false, message: Errors.invalid('username').JsError.message }
  }
}

// validando email
const email = (value) => {
  if (jagile.isEmail(value)) return { ok: true, value }
  else return { ok: false, message: Errors.invalid('email').JsError.message }
}

// validando password
const pass = (value) => {
  const { PASSWORD_MIN_CHAR, PASSWORD_MAX_CHAR } = process.env
  if (
    jagile.checkMinAndMaxValueEachWord(
      value,
      PASSWORD_MIN_CHAR,
      PASSWORD_MAX_CHAR
    )
  ) {
    return { ok: true, value }
  } else {
    return {
      ok: false,
      message: Errors.validate('limit-char', 'password').JsError.message,
    }
  }
}

// validando o sexo
const sex = (value) => {
  value = value.trim()
  const allowedSex = process.env.SEX_ALLOWED.split(',')
  if (jagile.inArray(allowedSex, value)) return { ok: true, value }
  else return { ok: false, message: Errors.invalid('sex').JsError.message }
}

// validando numero de telefone
const phoneNumber = (value) => {
  if (jagile.isPhoneNumber(value) || jagile.isPhoneNumber('+' + value)) {
    return { ok: true, value }
  } else {
    return {
      ok: false,
      message: Errors.invalid('phoneNumber').JsError.message,
    }
  }
}

// validando a categoria do arquivo
const fileCategory = (value) => {
  value = value.toLowerCase()
  if (alloweds.file.category.includes(value)) {
    return { ok: true, value }
  } else {
    return {
      ok: false,
      message: Errors.fileStatic('category').JsError.message,
    }
  }
}

// validando o tipo do arquivo
const fileType = (value) => {
  if (jagile.inArray(alloweds.file.type, value)) {
    return { ok: true, value }
  } else {
    return { ok: false, message: Errors.fileStatic('type').JsError.message }
  }
}

// validando o tipo de reação
const reactionType = (value) => {
  if (alloweds.reactions.includes(value)) return { ok: true, value }
  else {
    return {
      ok: false,
      message: Errors.invalidStatic('reaction-type').JsError.message,
    }
  }
}

const login = ({ user, password }) => {
  if (email(user).ok || phoneNumber(user).ok || username(user).ok) {
    if (pass(password).ok) return { ok: true, value: { user, password } }
    else return { ok: false }
  } else return { ok: false }
}

module.exports = ({ type, value }) => {
  switch (type) {
    case 'name':
      return name(value)
    case 'username':
      return username(value)
    case 'email':
      return email(value)
    case 'password':
      return pass(value)
    case 'phoneNumber':
      return phoneNumber(value)
    case 'sex':
      return sex(value)
    case 'file-category':
      return fileCategory(value)
    case 'file-type':
      return fileType(value)
    case 'reaction-type':
      return reactionType(value)
    case 'login':
      return login(value)
  }
}
