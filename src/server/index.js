const server = require('./app')
const mongoose = require('mongoose')
const {
  PORT,
  HOSTNAME,
  SERVER_NAME,
  APP_RUN,
  DB_NAME,
  LOCAL_DB_URI
} = process.env

const dbUri = APP_RUN === 'dev' ? LOCAL_DB_URI : LOCAL_DB_URI

// connect to mongodb with mongoose
mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) console.error('MONGODB ERROR: ', error)
    else {
      server.listen(PORT, HOSTNAME, () => {
        console.log(`
        CONECÇÃO COM A BASE DE DADOS "${DB_NAME.toUpperCase()}" FEITO COM SUCESSO.
        SERVIDOR "${SERVER_NAME}" ESTÁ RODANDO NA PORTA "${PORT}".
        `)
      })
    }
  }
)
mongoose.set('useFindAndModify', false)
