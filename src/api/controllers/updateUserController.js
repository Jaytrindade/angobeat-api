const { User } = require('@models')
const { Message, Success } = require('@messages')

module.exports = (req, res, next) => {
  try {
    const userData = req.SESSION_USER
    const { data } = req.data
    console.log(userData)
    console.log(data)
    Message.send(Success({ exec: true }), req, res)
  } catch (err) {
    next(err)
  }
}
