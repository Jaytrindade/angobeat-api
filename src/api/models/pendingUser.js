const { Schema, model } = require('mongoose')
const timeZone = require('mongoose-timezone')

const PendingUserSchema = Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    searchName: { type: String },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: String, enum: ['1', '2', '3'], required: true },
    born: { type: Date },
    phoneNumberCode: { type: String, required: true },
    checkedPhoneNumber: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: false, strict: true }
)

PendingUserSchema.query.byCheckCode = function (code, checked = false) {
  return this.where({ phoneNumberCode: code, checkedPhoneNumber: checked })
}

PendingUserSchema.plugin(timeZone, {
  paths: ['createdAt', 'born'],
})

module.exports = model('PendingUser', PendingUserSchema)
