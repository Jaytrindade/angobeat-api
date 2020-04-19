const router = require('express').Router()
const RequestFilters = require('@middlewares/request')
const Controllers = require('@controllers')

router.post('/', RequestFilters, (req, res, next) =>
  Controllers.auth.post[req.serviceType](req, res, next)
)

router.put('/', RequestFilters, (req, res, next) =>
  Controllers.auth.put[req.serviceType](req, res, next)
)

router.delete('/', RequestFilters, (req, res, next) =>
  Controllers.auth.delete[req.serviceType](req, res, next)
)

module.exports = router
