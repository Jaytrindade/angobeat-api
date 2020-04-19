const { Schema, model } = require('mongoose')
const timeZone = require('mongoose-timezone')

const PlaylistSchema = Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    musics: {
      qty: { type: Number, default: 0 },
      from: [
        {
          music: {
            type: Schema.Types.ObjectId,
            ref: 'Music',
            required: true,
          },
          user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        },
      ],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: true, strict: true }
)

PlaylistSchema.plugin(timeZone, { paths: ['createdAt'] })
module.exports = model('Playlist', PlaylistSchema)
