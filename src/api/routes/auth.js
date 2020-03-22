const router = require('express').Router()

router.post('/', (req, res, next) => {
  res.status(200).json({ message: 'passou nas routas' })
})

module.exports = router
