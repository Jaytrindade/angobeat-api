module.exports = {
  post: {
    signin: require('./signinController'),
    signup: require('./signupController'),
    authCheckPhoneNumber: require('./checkPhoneNumberController'),
    authCheckEmail: require('./checkEmailController'),
  },
}
