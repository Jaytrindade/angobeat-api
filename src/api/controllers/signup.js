const { Message, Success } = require('@messages')
const { User } = require('@models')

module.exports = async (req, res) => {
  try {
    const result = await User.find({})
    Message.send(Success(result), req, res)
  } catch (error) {
    throw error
  }
}
