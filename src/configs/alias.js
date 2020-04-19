const path = require('path')
const alias = require('module-alias')
const rootPath = path.resolve(__dirname, '..', '..')

alias.addAliases({
  '@src': path.resolve(rootPath, 'src'),
  '@api': path.resolve(rootPath, 'src', 'api'),
  '@models': path.resolve(rootPath, 'src', 'api', 'models'),
  '@controllers': path.resolve(rootPath, 'src', 'api', 'controllers'),
  '@routes': path.resolve(rootPath, 'src', 'api', 'routes'),
  '@middlewares': path.resolve(rootPath, 'src', 'api', 'middlewares'),
  '@utils': path.resolve(rootPath, 'src', 'api', 'utils'),
  '@messages': path.resolve(rootPath, 'src', 'api', 'messages'),
  '@services': path.resolve(rootPath, 'src', 'api', 'services'),
  '@configs': path.resolve(rootPath, 'src', 'configs'),
  '@server': path.resolve(rootPath, 'src', 'server'),
})
