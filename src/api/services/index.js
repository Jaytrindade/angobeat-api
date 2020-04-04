/**
 * aqui temos todos os serviçoes disponiveis para cada rotas
 * aqui cerfificamo-nos de que tudo está correcto e pode prosseguir
 */

module.exports = {
  // seriviços de autenticação
  signin: {
    fields: {
      user: { type: 'string', required: true },
      password: { type: 'string', required: true }
    },
    config: {
      output: {
        user: 'user',
        password: 'password'
      },
      minFields: 2
    }
  },
  signup: {
    fields: {
      name: { type: 'string', required: true, validate: 'name' },
      username: { type: 'string', required: true, validate: 'username' },
      phoneNumber: {
        type: 'string',
        required: true,
        validate: 'phone-number'
      },
      email: { type: 'string', required: true, validate: 'email' },
      password: { type: 'string', required: true, validate: 'password' },
      sex: { type: 'string', required: true, validate: 'sex' }
    },
    config: {
      output: {
        name: 'name',
        username: 'username',
        phoneNumber: 'phoneNumber',
        email: 'email',
        password: 'password',
        sex: 'sex'
      },
      minFields: 6
    }
  },
  'auth-isset-email': {
    fields: {
      email: { type: 'string', required: true, validate: ['email'] }
    },
    config: {
      output: { email: 'email' },
      minFields: 1
    }
  },
  'auth-isset-username': {
    fields: {
      username: { type: 'string', required: true, validate: ['username'] }
    },
    config: {
      output: { username: 'username' },
      minFields: 1
    }
  },

  // serviços do usuario
  'user-get-info': {
    fields: {
      userId: { type: 'objectId', required: false },
      username: { type: 'string', required: false, validate: ['username'] },
      email: { type: 'string', required: false, validate: ['email'] }
    },
    config: {
      minFields: 0
    }
  }
}