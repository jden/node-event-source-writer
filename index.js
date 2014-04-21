var Readable = require('stream').Readable
var util = require('util')


util.inherits(Source, Readable)
function Source() {
  Readable.call(this)
  this.setMaxListeners(Infinity)
  var push = this.push.bind(this)

  // start a few lines down
  push('\n\n')
  
  this._keepalive = setInterval(function () {
    Source.comment(Date.now())
  }, 10e3)
}

Source.prototype._read = function () {
  // since this is a push stream, this is a no-op
}

Source.prototype.dispatchEvent = function (e) {
  if (typeof e !== 'object') {
    throw new TypeError('e must be an object')
  }
  this.push(Source.serialize(e.event, e.data))
}

Source.serialize = function serialize(type, data) {
  var str = ''
  if (type !== null && type !== undefined) {
    str += 'event: ' + type
  }

  if (typeof data === 'object') {
    // remove the `type` property from the serialized JSON
    var removed = false
    try {
      str +='\ndata: ' + JSON.stringify(data)
      // readable mode, but uses more bytes
      // str += JSON.stringify(e, null, 2).split('\n').map(function(line) { return '\ndata: ' + line }).join('')
    } catch (e) { /* unable to serialize event data */ }  

  }

  str += '\n\n'
  return str
}

Source.comment = function comment(str) {
  return ':' + String(str).replace(/\s/g, ' ') + '\n\n'
}

Source.prototype.end = function() {
  clearInterval(this._keepalive)
  this.push(Source.comment('end'))
  this.push(null)
}

module.exports = Source