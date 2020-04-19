const { Message, Success, Errors } = require('@messages')
const validate = require('@services/validates')
const jagile = require('jsoft-agile')
const funcs = require('@utils')

const { User } = require('@models')

module.exports = async (req, res, next) => {
  try {
    const { data } = req

    if (validate({ type: 'login', value: data }).ok) {
      const result = await User.findOne().byLogin(data)

      if (jagile.hasValue(result)) {
        if (funcs.isSamePassowrd(data.password, result.password)) {
          const token = funcs.setToken({ userId: result._id })
          Message.send(Success({ token, userId: result._id }), req, res)
        } else Message.send(Errors.invalidStatic('login'), req, res)
      } else Message.send(Errors.invalidStatic('login'), req, res)
    } else Message.send(Errors.invalidStatic('login'), req, res)
  } catch (error) {
    next(error)
  }
}
