const { Schema, model } = require('mongoose')
const timeZone = require('mongoose-timezone')

const MusicSchema = Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    albun_id: { type: Schema.Types.ObjectId, ref: 'Albun' },
    name: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String },
    defaultUrl: { type: String },
    description: { type: String },
    duration: { type: Number, required: true },
    durationString: { type: String, required: true },
    formats: { type: [String] },
    thumbnail: { type: String },
    category: {
      type: String,
      enum: ['happy', 'sad', 'global'],
      default: 'global'
    },
    likes: {
      qty: { type: Number, default: 0 },
      from: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    unlikes: {
      qty: { type: Number, default: 0 },
      from: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    hasThumbnail: { type: Boolean, default: false },
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { minimize: true, strict: true }
)

MusicSchema.plugin(timeZone, { paths: ['createdAt'] })
module.exports = model('Music', MusicSchema)
