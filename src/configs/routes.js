const { PORT } = process.env
const ip = '127.0.0.1'
const remoteIp = '192.168.100.5'
const apiPrefix = 'api'
const baseUrl = `http://${ip}:${PORT}/${apiPrefix}`
const remoteBaseUrl = `http://${remoteIp}:${PORT}/${apiPrefix}`

module.exports = {
  ip,
  outIp: '',
  apiPrefix,
  baseUrl,
  defaultUrl: `http://${ip}:${PORT}`,
  apiUrl: `/${apiPrefix}`,
  remoteBaseUrl,
  apiCopyright:
    'AngoBeat-API <marinela118@hotmail.com> - Todos os direitos reservados',
}
