const router = require('express').Router()
const { request, authorization } = require('@middlewares')
const Controllers = require('@controllers')

router.post('/', authorization.private, request, (req, res, next) =>
  Controllers.user.post[req.serviceType](req, res, next)
)

router.put('/', authorization.private, request, (req, res, next) =>
  Controllers.user.put[req.serviceType](req, res, next)
)

router.delete('/', authorization.private, request, (req, res, next) =>
  Controllers.user.delete[req.serviceType](req, res, next)
)

module.exports = router
