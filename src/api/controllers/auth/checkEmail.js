const mongoose = require('mongoose')

const { Message, Success, Errors } = require('@messages')
const { User, PendingUser, Admin, PendingAdmin } = require('@models')
const jagile = require('jsoft-agile')

module.exports = async (type = 'user', req, res, next) => {
  try {
    const { code } = req.data
    const useUserModel = type === 'user' ? User : Admin
    const usePendingModel = type === 'user' ? PendingUser : PendingAdmin

    if (jagile.hasValue(code) && mongoose.isValidObjectId(code)) {
      const updateUser = await useUserModel.findOneAndUpdate(
        { _id: code, checkedEmail: false },
        { $set: { checkedEmail: true, lastUpdate: new Date() } }
      )

      if (jagile.hasValue(updateUser)) {
        Message.send(Success({ exec: true }), req, res)
      } else {
        const oldUser = await usePendingModel
          .findOneAndDelete({
            _id: code,
          })
          .exec()

        if (jagile.hasValue(oldUser)) {
          await usePendingModel.deleteMany({
            $or: [{ email: oldUser.email }, { username: oldUser.username }],
          })

          const setNew = { ...oldUser }
          await useUserModel({ ...setNew._doc, checkedEmail: true }).save()

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
