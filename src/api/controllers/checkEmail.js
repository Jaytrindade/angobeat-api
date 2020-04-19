const mongoose = require('mongoose')

const { Message, Success, Errors } = require('@messages')
const { User, PendingUser } = require('@models')
const jagile = require('jsoft-agile')

module.exports = async (req, res, next) => {
  try {
    const { code } = req.data

    if (jagile.hasValue(code) && mongoose.isValidObjectId(code)) {
      const updateUser = await User.findOneAndUpdate(
        { _id: code, checkedEmail: false },
        { $set: { checkedEmail: true, lastUpdate: new Date() } }
      )

      if (jagile.hasValue(updateUser)) {
        Message.send(Success({ exec: true }), req, res)
      } else {
        const oldUser = await PendingUser.findOneAndDelete({
          _id: code,
        }).exec()

        if (jagile.hasValue(oldUser)) {
          await PendingUser.deleteMany({
            $or: [{ email: oldUser.email }, { username: oldUser.username }],
          })

          const setNew = { ...oldUser }
          await User({ ...setNew._doc, checkedEmail: true }).save()

          Message.send(Success({ exec: true }), req, res)
        } else {
          Message.send(Errors.invalidStatic('checkAcount'), req, res)
        }
      }
    } else Message.send(Errors.invalidStatic('checkAcount'), req, res)
  } catch (err) {
    next(err)
  }
}
