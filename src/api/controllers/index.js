module.exports = {
  auth: require('./authController'),
  user: {
    post: {
      userUpdateMe: require('./updateUserController'),
    },
  },
}
