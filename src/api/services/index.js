/* eslint-disable comma-dangle */
/**
 * aqui temos todos os serviçoes disponiveis para cada rotas
 * aqui cerfificamo-nos de que tudo está correcto e pode prosseguir
 */

module.exports = {
  // seriviços de autenticação
  signin: {
    fields: {
      user: { type: 'string', required: true },
      password: { type: 'string', required: true },
    },
    config: {
      output: {
        user: 'user',
        password: 'password',
      },
      minFields: 2,
    },
  },
  signup: {
    fields: {
      name: { type: 'string', required: true, validate: 'name' },
      username: { type: 'string', required: true, validate: 'username' },
      phoneNumber: {
        type: 'string',
        required: true,
        validate: 'phoneNumber',
      },
      email: { type: 'string', required: true, validate: 'email' },
      password: { type: 'string', required: true, validate: 'password' },
      sex: { type: 'string', required: true, validate: 'sex' },
    },
    config: {
      output: {
        name: 'name',
        username: 'username',
        phoneNumber: 'phoneNumber',
        email: 'email',
        password: 'password',
        born: 'born',
        sex: 'sex',
      },
      minFields: 6,
    },
  },
  authIssetPhoneNumber: {
    fields: {
      phoneNumber: { type: 'string', required: true, validate: 'phone' },
    },
    config: {
      output: { phoneNumber: 'phoneNumber' },
      minFields: 1,
    },
  },
  authIssetEmail: {
    fields: {
      email: { type: 'string', required: true, validate: 'email' },
    },
    config: {
      output: { email: 'email' },
      minFields: 1,
    },
  },
  authIssetUsername: {
    fields: {
      username: { type: 'string', required: true, validate: 'username' },
    },
    config: {
      output: { username: 'username' },
      minFields: 1,
    },
  },
  authCheckPhoneNumber: {
    fields: {
      code: { type: 'string', required: true },
    },
    config: {
      output: {
        code: 'code',
      },
      minFields: 1,
    },
  },
  authCheckEmail: {
    fields: { code: { type: 'string', required: true } },
    config: {
      output: { code: 'code' },
      minFields: 1,
    },
  },
  // serviços do usuario
  userGetInfo: {
    fields: {
      userId: { type: 'objectId' },
      username: { type: 'string', validate: ['username'] },
      email: { type: 'string', validate: ['email'] },
    },
    config: {
      minFields: 0,
    },
  },
  // serviços do usuario
  userUpdateMe: {
    fields: {},
    config: {
      output: {},
      minFields: 0,
    },
  },
}
