const { Message, Success, Errors } = require('@messages')
const validate = require('@services/validates')
const jagile = require('jsoft-agile')
const funcs = require('@utils')

const { User, AdminUser } = require('@models')

module.exports = async (type = 'user', req, res, next) => {
  try {
    const { data } = req

    if (validate({ type: 'login', value: data }).ok) {
      const useModel = type === 'user' ? User : AdminUser
      const result = await useModel.findOne().byLogin(data)

      if (jagile.hasValue(result)) {
        if (funcs.isSamePassoword(data.password, result.password)) {
          const token = funcs.setToken({ userId: result._id })
          Message.send(Success({ token, userId: result._id }), req, res)
        } else Message.send(Errors.invalidStatic('login'), req, res)
      } else Message.send(Errors.invalidStatic('login'), req, res)
    } else Message.send(Errors.invalidStatic('login'), req, res)
  } catch (error) {
    next(error)
  }
}
