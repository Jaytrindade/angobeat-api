module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Service'
  )

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE')
  }

  next()
}
