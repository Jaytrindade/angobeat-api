const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') })
require('module-alias/register')
require('../configs/alias')

const app = require('express')()
const Routes = require('@routes')

Routes(app)

module.exports = app
