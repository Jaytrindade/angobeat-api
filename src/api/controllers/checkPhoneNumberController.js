const { Message, Success, Errors } = require('@messages')
const { User, PendingUser } = require('@models')
const jagile = require('jsoft-agile')

module.exports = async (req, res, next) => {
  try {
    const { code } = req.data
    const result = await User.findOneAndUpdate(
      {},
      {
        $set: {
          checkedPhoneNumber: true,
          phoneNumberCode: '',
          lastUpdate: new Date(),
        },
      }
    ).byCheckCode(code)

    if (jagile.hasValue(result)) {
      Message.send(Success({ exec: true }), req, res)
    } else {
      const pendingUser = await PendingUser.findOne().byCheckCode(code)

      if (jagile.hasValue(pendingUser)) {
        const getNew = { ...pendingUser }
        await User({
          ...getNew._doc,
          checkedPhoneNumber: true,
        }).save()

        await PendingUser.deleteMany({ phoneNumber: pendingUser.phoneNumber })

        Message.send(Success({ exec: true }), req, res)
      } else Message.send(Errors.invalidStatic('code'), req, res)
    }
  } catch (err) {
    next(err)
  }
}
