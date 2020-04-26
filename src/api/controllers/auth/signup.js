const mongoose = require('mongoose')
const generateVerificationCode = require('generate-sms-verification-code')

const { remoteBaseUrl } = require('@configs/routes')
const { sendEmail } = require('@services/email')
const { sendSMS } = require('@services/sms')
const { Message, Success, Errors } = require('@messages')
const { User, Admin, PendingUser, PendingAdmin } = require('@models')
const jagile = require('jsoft-agile')
const funcs = require('@utils')

// check if user already exist
const existUser = async (type, data) => {
  const userModel = type === 'user' ? User : Admin
  const userData = await userModel
    .find()
    .findOne()
    .bySignup(data)
    .select('email username phoneNumber checkedPhoneNumber')
    .exec()

  if (jagile.hasValue(userData)) {
    const errors = {}
    if (userData.email === data.email) {
      errors.email = Errors.exist('email').JsError
    }
    if (userData.username === data.username) {
      errors.username = Errors.exist('username').JsError
    }
    if (
      userData.phoneNumber === data.phoneNumber &&
      userData.checkedPhoneNumber === true
    ) {
      errors.phoneNumber = Errors.exist('phoneNumber').JsError
    }
    return {
      ok: true,
      errors: {
        errors,
        keys: Object.keys(errors),
      },
    }
  } else return { ok: false }
}

module.exports = async (type = 'user', req, res, next) => {
  try {
    const { data } = req
    const checkUser = await existUser(type, data)

    if (!checkUser.ok) {
      data._id = mongoose.Types.ObjectId()
      data.password = funcs.setHashPassword(data.password)
      data.searchName = funcs.filterSearch(data.name)
      data.phoneNumberCode = generateVerificationCode(6, { type: 'string' })

      const usePendingModel = type === 'user' ? PendingUser : PendingAdmin
      const result = await usePendingModel(data).save()

      const optios = {
        to: data.email,
        subject: 'Confirmação de email',
        text: '',
        opts: {
          link: `${remoteBaseUrl}/auth/check-account/${result._id}`,
          name: result.name,
          type: 'auth',
        },
      }
      sendEmail(optios)
      sendSMS(
        '244944271531',
        `Ango-Beat: Este é o código para confirmar o seu número: ${data.phoneNumberCode}`
      )
      Message.send(Success({ exec: true }), req, res)
      return
    } else Message.send(Errors.set(checkUser.errors), req, res)
  } catch (error) {
    next(error)
  }
}
