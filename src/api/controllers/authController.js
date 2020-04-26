const { signin, signup, checkEmail, checkPhoneNumber } = require('./auth')

module.exports = {
  user: {
    post: {
      signup: (req, res, next) => signup('user', req, res, next),
      signin: (req, res, next) => signin('user', req, res, next),
      authCheckEmail: (req, res, next) => checkEmail('user', req, res, next),
      authCheckPhoneNumber: (req, res, next) =>
        checkPhoneNumber('user', req, res, next),
    },
  },
  admin: {
    post: {
      signup: (req, res, next) => signup('admin', req, res, next),
      signin: (req, res, next) => signin('admin', req, res, next),
      authCheckEmail: (req, res, next) => checkEmail('admin', req, res, next),
      authCheckPhoneNumber: (req, res, next) =>
        checkPhoneNumber('admin', req, res, next),
    },
  },
}
