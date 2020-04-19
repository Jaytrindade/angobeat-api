const { Schema, model } = require('mongoose')
const timeZone = require('mongoose-timezone')

const AlbunSchema = Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    qtyMusics: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { minimize: true, strict: true }
)

AlbunSchema.plugin(timeZone, { paths: ['createdAt'] })

module.exports = model('Albun', AlbunSchema)
