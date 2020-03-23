const jagile = require('jsoft-agile')

module.exports = data => {
  if (typeof data === 'string') return { JsSuccess: { message: data } }
  if (jagile.isCommonObject(data)) return { JsSuccess: data }
  return { JsSuccess: { value: data } }
}
