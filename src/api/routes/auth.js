const router = require('express').Router()
const { Message, Success } = require('@messages')

router.post('/', (req, res, next) => {
  Message.send(Success({ message: 'passou nas routas' }), req, res)
})

module.exports = router
