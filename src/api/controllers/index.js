module.exports = {
  post: {
    signin: require('./signin'),
    signup: require('./signup'),
    authCheckPhoneNumber: require('./checkPhoneNumber'),
    authCheckEmail: require('./checkEmail'),
  },
}
