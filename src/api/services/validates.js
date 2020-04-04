const jagile = require('jsoft-agile')
const { Errors } = require('@messages')
const alloweds = require('@configs/alloweds')

// validando o nome
const name = value => {
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
      message: Errors.validate('limit-char', 'name').JsError.message.pt
    }
  }
}

// validando username
const username = value => {
  value = value.trim()
  const { USERNAME_MAX_CHAR, USERNAME_MIN_CHAR } = process.env
  if (
    jagile.checkMinValueEachWords(value, USERNAME_MIN_CHAR) &&
    jagile.checkMaxValueEachWords(value, USERNAME_MAX_CHAR) &&
    jagile.isUsername(value)
  ) {
    return { ok: true, value }
  } else {
    return { ok: false, message: Errors.invalid('username').JsError.message.pt }
  }
}

// validando email
const email = value => {
  if (jagile.isEmail(value)) return { ok: true, value }
  else return { ok: false, message: Errors.invalid('email').JsError.message.pt }
}

// validando password
const password = value => {
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
      message: Errors.validate('limit-char', 'password').JsError.message.pt
    }
  }
}

// validando o sexo
const sex = value => {
  value = value.trim()
  const allowedSex = process.env.SEX_ALLOWED.split(',')
  if (jagile.inArray(allowedSex, value)) return { ok: true, value }
  else return { ok: false, message: Errors.invalid('sex').JsError.message.pt }
}

// validando numero de telefone
const phoneNumber = value => {
  if (jagile.isPhoneNumber(value) || jagile.isPhoneNumber('+' + value)) {
    return { ok: true, value }
  } else {
    return {
      ok: false,
      message: Errors.invalid('phone-number').JsError.message.pt
    }
  }
}

// validando a categoria do arquivo
const fileCategory = value => {
  value = value.toLowerCase()
  if (alloweds.file.category.includes(value)) {
    return { ok: true, value }
  } else {
    return {
      ok: false,
      message: Errors.fileStatic('category').JsError.message.pt
    }
  }
}

// validando o tipo do arquivo
const fileType = value => {
  if (jagile.inArray(alloweds.file.type, value)) {
    return { ok: true, value }
  } else {
    return { ok: false, message: Errors.fileStatic('type').JsError.message.pt }
  }
}

// validando o tipo de reação
const reactionType = value => {
  if (alloweds.reactions.includes(value)) return { ok: true, value }
  else {
    return {
      ok: false,
      message: Errors.invalidStatic('reaction-type').JsError.message.pt
    }
  }
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
      return password(value)
    case 'phone-number':
      return phoneNumber(value)
    case 'sex':
      return sex(value)
    case 'file-category':
      return fileCategory(value)
    case 'file-type':
      return fileType(value)
    case 'reaction-type':
      return reactionType(value)
  }
}