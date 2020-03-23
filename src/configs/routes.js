const { PORT } = process.env
const ip = '127.0.0.1'
const apiPrefix = 'api'
const baseUrl = `http://${ip}:${PORT}/${apiPrefix}`

module.exports = {
  ip,
  apiPrefix,
  baseUrl,
  apiUrl: `/${apiPrefix}`,
  apiCopyright:
    'AngoBeat-API <marinela118@hotmail.com> - Todos os direitos reservados'
}
