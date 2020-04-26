const { Message, Success, Errors } = require('@messages')
const { User, PendingUser, Admin, PendingAdmin } = require('@models')
const jagile = require('jsoft-agile')

module.exports = async (type, req, res, next) => {
  try {
    const { code } = req.data
    const useUserModel = type === 'user' ? User : Admin
    const usePendingModel = type === 'user' ? PendingUser : PendingAdmin
    const result = await useUserModel
      .findOneAndUpdate(
        {},
        {
          $set: {
            checkedPhoneNumber: true,
            phoneNumberCode: '',
            lastUpdate: new Date(),
          },
        }
      )
      .byCheckCode(code)

    if (jagile.hasValue(result)) {
      Message.send(Success({ exec: true }), req, res)
    } else {
      const pendingUser = await usePendingModel.findOne().byCheckCode(code)

      if (jagile.hasValue(pendingUser)) {
        const getNew = { ...pendingUser }
        await useUserModel({
          ...getNew._doc,
          checkedPhoneNumber: true,
        }).save()

        await usePendingModel.deleteMany({
          phoneNumber: pendingUser.phoneNumber,
        })

        Message.send(Success({ exec: true }), req, res)
      } else Message.send(Errors.invalidStatic('code'), req, res)
    }
  } catch (err) {
    next(err)
  }
}
