const jagile = require('jsoft-agile')
const { Message, Errors } = require('@messages')
const Services = require('@services')
const Validators = require('@services/validates')

// verifica se a requisição é segura e pode continuar
module.exports = (req, res, next) => {
  const { service } = req.headers

  if (jagile.hasValue(service)) {
    const body = req.body
    const result = jagile.wallFilters({
      service,
      data: body,
      rules: Services,
      validations: Validators
    })

    if (result.ok && result.exec) {
      const { data } = result
      req.serviceType = service
      req.data = data
      next()
    } else Message.send(Errors.set(result), req, res)
  } else Message.send(Errors.request('unknown-service'), req, res)
}
