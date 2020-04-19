const { Schema, Types, model } = require('mongoose')
const timeZone = require('mongoose-timezone')

const UserSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, default: Types.ObjectId() },
    picImage: { type: String },
    bigImage: { type: String },
    name: { type: String, required: true },
    searchName: { type: String },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: String, enum: ['1', '2', '3'], required: true },
    born: { type: Date },
    albuns: {
      qty: { type: Number, default: 0 },
      from: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    following: {
      qty: { type: Number, default: 0 },
      from: [
        {
          _id: { type: Schema.Types.ObjectId, required: true },
          uid: { type: Schema.Types.ObjectId, ref: 'User' },
        },
      ],
    },
    followers: {
      qty: { type: Number, default: 0 },
      from: [
        {
          _id: { type: Schema.Types.ObjectId, required: true },
          uid: { type: Schema.Types.ObjectId, ref: 'User' },
        },
      ],
    },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    isPendingNewPhoneNumber: { type: Boolean, default: false },
    pendingNewPhoneNumber: { type: String },
    isPendingNewEmail: { type: Boolean, default: false },
    pendingNewEmail: { type: String },
    checkedPhoneNumber: { type: Boolean, default: false },
    phoneNumberCode: { type: String },
    checkedEmail: { type: Boolean, default: false },
    activeAccount: { type: Boolean, default: true },
    isArtist: { type: Boolean, default: false },
    lastUpdate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: false }
)

UserSchema.query.bySignup = function (data) {
  return this.where({
    $or: [
      { email: data.email, checkedEmail: true },
      { phoneNumber: data.phoneNumber, checkedPhoneNumber: true },
      { username: data.username, checkedEmail: true },
      { username: data.username, checkedPhoneNumber: true },
    ],
  })
}

UserSchema.query.byLogin = function (data) {
  return this.where({
    $or: [
      { email: data.user, checkedEmail: true },
      {
        phoneNumber: data.user,
        checkedPhoneNumber: true,
      },
      { username: data.user, checkedEmail: true },
      {
        username: data.user,
        checkedPhoneNumber: true,
      },
    ],
  }).select('_id password')
}

UserSchema.query.byCheckCode = function (code, checked = false) {
  return this.where({ phoneNumberCode: code, checkedPhoneNumber: checked })
}

UserSchema.plugin(timeZone, {
  paths: ['lastUpdate', 'createdAt', 'born'],
})

module.exports = model('Users', UserSchema)
