var util = require('util')

function extend(to, from) {
  var cls = this

  if (typeof cls === 'function' && arguments.length === 1) {
    from = cls
  }

  Object.keys(from.prototype).forEach(function (key) {
    to.prototype[key] = from.prototype[key]
  })

  Object.keys(from).forEach(function (key) {
    to[key] = from[key]
  })
}

function inherit(to, from) {
  var cls = this

  if (typeof cls === 'function' && arguments.length === 1) {
    from = cls
  }

  util.inherits(to, from)

  Object.keys(from).forEach(function (key) {
    to[key] = from[key]
  })
}

module.exports = {
  extend: extend,
  inherit: inherit
}
