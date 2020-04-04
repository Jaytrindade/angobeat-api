const { Schema, model } = require('mongoose')
const timeZone = require('mongoose-timezone')

const UserSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    picImage: { type: String },
    bigImage: { type: String },
    name: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: String, enum: ['1', '2'], required: true },
    qtyAlbuns: { type: Number, default: 0 },
    following: {
      qty: { type: Number, default: 0 },
      from: [
        {
          _id: { type: Schema.Types.ObjectId, required: true },
          uid: { type: Schema.Types.ObjectId, ref: 'User' }
        }
      ]
    },
    followers: {
      qty: { type: Number, default: 0 },
      from: [
        {
          _id: { type: Schema.Types.ObjectId, required: true },
          uid: { type: Schema.Types.ObjectId, ref: 'User' }
        }
      ]
    },
    theme: { type: String, enum: ['light', 'dark'] },
    checkedPhoneNumber: { type: Boolean, default: false },
    checkedEmail: { type: Boolean, default: false },
    activeAccount: { type: Boolean, default: false },
    lastUpdate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
  },
  { minimize: false, strict: true }
)

UserSchema.query.bySignup = function(data) {
  return this.where({
    $or: [
      { email: data.email, emailChecked: true },
      { username: data.username, emailChecked: true }
    ]
  })
}

UserSchema.plugin(timeZone, { paths: ['lastUpdate', 'createdAt'] })
module.exports = model('User', UserSchema)
