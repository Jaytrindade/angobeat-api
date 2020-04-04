const router = require('express').Router()
const Controllers = require('@controllers')

router.get('/', (req, res, next) =>
  Controllers.get[req.serviceType](req, res, next)
)

router.post('/', (req, res, next) =>
  Controllers.post[req.serviceType](req, res, next)
)

router.put('/', (req, res, next) =>
  Controllers.put[req.serviceType](req, res, next)
)

router.delete('/', (req, res, next) =>
  Controllers.delete[req.serviceType](req, res, next)
)

module.exports = router
