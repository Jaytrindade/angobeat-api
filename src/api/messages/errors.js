const fieldsName = require('./fields')

// configuracoes de mensagens de erros
module.exports = {
  errors: {
    required: {
      'all-fields': {
        code: 'js-required-1',
        message: 'Todos os campos são obrigatorios.',
      },
      field: (field) => {
        const fields = fieldsName[field]
        return {
          code: 'js-required-2',
          message: `O campo <${fields.pt}> é obrigatório.`,
        }
      },
      'all-datas': {
        code: 'js-required-3',
        message: 'Os dodos não estão completos.',
      },
    },
    notFound: {
      'all-data': {
        code: 'js-not-found-1',
        message: 'Dados não encontrados.',
      },
      data: (field) => {
        const fields = fieldsName[field]
        return {
          code: 'js-not-found-2',
          message: {
            pt: `${fields.pt}: Dados não encontrado.`,
            en: `${fields.en}: Not found data.`,
          },
        }
      },
    },
    invalid: {
      request: {
        code: 'js-request-1',
        message: 'Requisição Inválida.',
      },
      login: {
        code: 'js-login-1',
        field: 'login',
        message: 'Usuário inválido.',
      },
      'reaction-type': {
        code: 'js-reaction-1',
        field: 'react',
        message: `<${fieldsName.reaction.pt}> inválida.`,
      },
      'correct-data': {
        code: 'js-correct-1',
        message: 'Envie dados correctos.',
      },
      checkAcount: {
        code: 'js-check-acount-1',
        message: 'Link inválido!',
      },
    },
    exist: {},
    unknown: {
      conde: 'js-unknown-1',
      message: 'Oooops! Algo deu errado, tente novamente em um minuto.',
    },
    files: {
      category: {
        code: 'js-files-1',
        message: 'Categoria inválida.',
      },
      type: {
        code: 'js-files-2',
        message: 'Tipo de aqruivo inválido.',
      },
    },
    request: {
      'service-not-allowed': {
        code: 'js-request-2',
        message: 'Serviço não registrado.',
      },
      'unknown-service': {
        code: 'js-request-3',
        message: 'Não sei que tipo de serviço queres acessar!',
      },
      'field-formats': {
        code: 'js-request-4',
        message: 'Envie os dados de acordo com os seus formatos.',
      },
      session: {
        code: 'js-session-1',
        message: 'Usuário não autenticado.',
      },
    },
    validate: {
      'limit-char': {
        name: {
          code: 'js-name-3',
          field: 'name',
          message: `<${fieldsName.name.pt}> de ${process.env.NAME_MIN_CHAR} à ${process.env.NAME_MAX_CHAR} caracteres.`,
        },
        username: {
          code: 'js-username-3',
          field: 'username',
          message: `<${fieldsName.username.pt}> de ${process.env.USERNAME_MIN_CHAR} à ${process.env.USERNAME_MAX_CHAR} caracteres.`,
        },
        password: {
          code: 'js-password-1',
          field: 'password',
          message: `<${fieldsName.password.pt}> de ${process.env.PASSWORD_MIN_CHAR} à ${process.env.PASSWORD_MAX_CHAR} caracteres.`,
        },
      },
      different: {
        password: {
          code: 'js-password-2',
          field: 'password',
          message: `A <${fieldsName.password.pt}> não corresponde.`,
        },
      },
    },
  },
  required: function (type, field = false) {
    if (field) return { JsError: this.errors.required[type](field) }
    else return { JsError: this.errors.required[type] }
  },
  notFound: function (type, field = false) {
    if (field) return { JsError: this.errors.notFound[type](field) }
    else return { JsError: this.errors.notFound[type] }
  },
  invalidStatic: function (type) {
    return { JsError: this.errors.invalid[type] }
  },
  invalid: function (type) {
    return {
      JsError: {
        code: `js-${type}-1`,
        field: type,
        message: `<${fieldsName[type].pt}> inválido.`,
      },
    }
  },
  unknown: function () {
    return { JsError: this.errors.unknown }
  },
  uploadStatic: function (type) {
    return { JsError: this.errors.upload[type] }
  },
  fileStatic: function (type) {
    return { JsError: this.errors.files[type] }
  },
  request: function (type) {
    return { JsError: this.errors.request[type] }
  },
  existStatic: function (type) {
    return { JsError: this.errors.exist[type] }
  },
  exist: (type) => ({
    JsError: {
      code: `js-${type}-2`,
      field: type,
      message: `<${fieldsName[type].pt}> já existe.`,
    },
  }),
  validate: function (type, field) {
    return { JsError: this.errors.validate[type][field] }
  },
  set: (error) => ({ JsError: error }),
}
