const configRoutes = require('@configs/routes')

exports.setRouter = name => `${configRoutes.apiUrl}/${name}`
