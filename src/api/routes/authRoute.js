const router = require('express').Router()
const { request, authorization } = require('@middlewares')
const Controllers = require('@controllers')

router.post('/user', request, (req, res, next) =>
  Controllers.auth.user.post[req.serviceType](req, res, next)
)
router.post('/admin', authorization.adminAccess, request, (req, res, next) =>
  Controllers.auth.admin.post[req.serviceType](req, res, next)
)

module.exports = router
