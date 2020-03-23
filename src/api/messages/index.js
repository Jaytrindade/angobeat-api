const Errors = require('./errors')
const Success = require('./success')
const { baseUrl, apiCopyright } = require('@configs/routes')

module.exports = {
  Success,
  Errors,
  Message: {
    send: (data, req, res) => {
      const newToken = req.NEW_TOKEN || ''
      const hasNewToken = !!newToken
      let status = 200

      const message = {
        success: false,
        request: req.headers.request,
        url: `${baseUrl}${req.originalUrl}`,
        hasNewToken: hasNewToken,
        token: newToken,
        data: {},
        status: 500,
        date: new Date().toISOString(),
        copyright: apiCopyright
      }
      if (data.JsError) {
        message.data = data.JsError
      } else if (data.JsSuccess) {
        message.success = true
        message.data = data.JsSuccess
        message.status = 200
        status = 200
      } else if (data.error) {
        message.status = data.error.status
        status = data.error.status
        message.data = { message: data.error.message }
      } else message.data = { message: data.message }

      res.status(status).json(message)
    }
  }
}
