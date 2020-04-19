module.exports = {
  auth: {
    post: {
      signin: require('./signinController'),
      signup: require('./signupController'),
      authCheckPhoneNumber: require('./checkPhoneNumberController'),
      authCheckEmail: require('./checkEmailController'),
    },
  },
  user: {
    post: {
      userUpdateMe: require('./updateUserController'),
    },
  },
}
