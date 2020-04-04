const fieldsName = require('./fields')

// show to users how to send data
const examples = {
  username: 'Ex: [joao, _joao99, joao99_, ...]'
}

// error message config
module.exports = {
  errors: {
    required: {
      'all-fields': {
        code: 'js-required-1',
        message: {
          pt: 'Todos os campos são obrigatorios.',
          en: 'All fields is required.'
        }
      },
      field: field => {
        const fields = fieldsName[field]
        return {
          code: 'js-required-2',
          message: {
            pt: `O campo <${fields.pt}> é obrigatório.`,
            en: `The field <${fields.en}> is required.`
          }
        }
      },
      'all-datas': {
        code: 'js-required-3',
        message: {
          pt: 'Os dodos não estão completos.',
          en: 'The datas is not complete.'
        }
      }
    },
    notFound: {
      'all-data': {
        code: 'js-not-found-1',
        message: {
          pt: 'Dados não encontrados.',
          en: 'Not found datas.'
        }
      },
      data: field => {
        const fields = fieldsName[field]
        return {
          code: 'js-not-found-2',
          message: {
            pt: `${fields.pt}: Dados não encontrado.`,
            en: `${fields.en}: Not found data.`
          }
        }
      }
    },
    invalid: {
      request: {
        code: 'js-request-1',
        message: {
          pt: 'Requisição Inválida.',
          en: 'Invalid Request.'
        }
      },
      login: {
        code: 'js-login-1',
        field: 'login',
        message: {
          pt: 'Usuário inválido.',
          en: 'Invalid user.'
        }
      },
      'reaction-type': {
        code: 'js-reaction-1',
        field: 'react',
        message: {
          pt: `<${fieldsName.reaction.pt}> inválida.`,
          en: `Invalid <${fieldsName.reaction.en}>.`
        }
      },
      'correct-data': {
        code: 'js-correct-1',
        message: {
          pt: 'Envie dados correctos.',
          en: 'Send the correct values.'
        }
      },
      'work-area-category': {
        code: 'js-work-area-category-1',
        field: 'workAreaCategory',
        message: {
          pt: `<${fieldsName.workAreaCategory.pt}> inválido.`,
          en: `Invalid <${fieldsName.workAreaCategory.en}>.`
        }
      }
    },
    exist: {},
    unknown: {
      conde: 'js-unknown-1',
      message: {
        pt: 'Oooops! Algo deu errado, tente novamente em um minuto.',
        en: 'Oooops! Something is wrong, try again in one minute.'
      }
    },
    files: {
      category: {
        code: 'js-files-1',
        message: {
          pt: 'Categoria inválida.',
          en: 'Invalid category.'
        }
      },
      type: {
        code: 'js-files-2',
        message: {
          pt: 'Tipo de aqruivo inválido.',
          en: 'Invalid type file.'
        }
      }
    },
    request: {
      'service-not-allowed': {
        code: 'js-request-2',
        message: {
          pt: 'Serviço não registrado.',
          en: 'Service is not allowed.'
        }
      },
      'unknown-service': {
        code: 'js-request-3',
        message: {
          pt: 'Não sei que tipo de serviço queres acessar!',
          en: "I don't know what kind of service you want to access!"
        }
      },
      'field-formats': {
        code: 'js-request-4',
        message: {
          pt: 'Envie os dados de acordo com os seus formatos.',
          en: 'Send the data according to their formats.'
        }
      },
      session: {
        code: 'js-session-1',
        message: {
          pt: 'Usuário não autenticado.',
          en: 'Unauthenticated user.'
        }
      }
    },
    validate: {
      'limit-char': {
        name: {
          code: 'js-name-3',
          field: 'name',
          message: {
            pt: `<${fieldsName.name.pt}> de ${process.env.NAME_MIN_CHAR} à ${process.env.NAME_MAX_CHAR} caracteres.`,
            en: `<${fieldsName.name.pt}> from ${process.env.NAME_MIN_CHAR} to ${process.env.NAME_MAX_CHAR} characters.`
          }
        },
        username: {
          code: 'js-username-3',
          field: 'username',
          message: {
            pt: `<${fieldsName.username.pt}> de ${process.env.USERNAME_MIN_CHAR} à ${process.env.USERNAME_MAX_CHAR} caracteres.`,
            en: `<${fieldsName.username.en}> from ${process.env.USERNAME_MIN_CHAR} to ${process.env.USERNAME_MAX_CHAR} characters.`
          }
        },
        password: {
          code: 'js-password-1',
          field: 'password',
          message: {
            pt: `<${fieldsName.password.pt}> de ${process.env.PASSWORD_MIN_CHAR} à ${process.env.PASSWORD_MAX_CHAR} caracteres.`,
            en: `<${fieldsName.password.en}> from ${process.env.PASSWORD_MIN_CHAR} to ${process.env.PASSWORD_MAX_CHAR} characters.`
          }
        }
      },
      different: {
        password: {
          code: 'js-password-2',
          field: 'password',
          message: {
            pt: `A <${fieldsName.password.pt}> não corresponde.`,
            en: `The <${fieldsName.password.en}> is different.`
          }
        }
      }
    }
  },
  required: function(type, field = false) {
    if (field) return { JsError: this.errors.required[type](field) }
    else return { JsError: this.errors.required[type] }
  },
  notFound: function(type, field = false) {
    if (field) return { JsError: this.errors.notFound[type](field) }
    else return { JsError: this.errors.notFound[type] }
  },
  invalidStatic: function(type) {
    return { JsError: this.errors.invalid[type] }
  },
  invalid: function(type) {
    return {
      JsError: {
        code: `js-${type}-1`,
        field: type,
        hasExample: Object.keys(examples).includes(type),
        example: examples[type] || '',
        message: {
          pt: `<${fieldsName[type].pt}> inválido.`,
          en: `Invalid <${fieldsName[type].en}>.`
        }
      }
    }
  },
  unknown: function() {
    return { JsError: this.errors.unknown }
  },
  uploadStatic: function(type) {
    return { JsError: this.errors.upload[type] }
  },
  fileStatic: function(type) {
    return { JsError: this.errors.files[type] }
  },
  request: function(type) {
    return { JsError: this.errors.request[type] }
  },
  existStatic: function(type) {
    return { JsError: this.errors.exist[type] }
  },
  exist: type => ({
    JsError: {
      code: `js-${type}-2`,
      field: type,
      message: {
        pt: `<${fieldsName[type].pt}> já existe.`,
        en: `The <${fieldsName[type].en}> value already exist.`
      }
    }
  }),
  validate: function(type, field) {
    return { JsError: this.errors.validate[type][field] }
  },
  set: error => ({ JsError: error })
}
