require('chai').should()

var EventSourceWriter = require('../.')

describe('event-source-writer', function () {
  it('is a constructor', function () {
    var source = new EventSourceWriter
    source.should.be.instanceof(EventSourceWriter)
  })
  it('serializes events into a stream', function (done) {
    var source = new EventSourceWriter
    var data = ''
    source.pipe.should.be.instanceof(Function)
    source.readable.should.equal(true)
    
    source.on('data', function (e) {
      data += e
    })
    source.on('end', function () {
      data.indexOf('event: foo')
        .should.be.greaterThan(0)
      done()
    })

    source.dispatchEvent({type: 'foo'})
    source.end()
  })
})

describe('serialize', function () {
  it('serializes an event object', function () {
    var event = {
      type: 'close',
      target: 'window'
    }

    EventSourceWriter.serialize(event)
      .should.equal(
        'event: close\n'
       +'data: {"target":"window"}\n'
       + '\n'
      )
  })
  it('data is optional', function() {
    EventSourceWriter.serialize({type: 'close'})
      .should.equal('event: close\n\n')
  })
})

describe('comment', function () {
  it('formats a comment', function () {
    EventSourceWriter.comment('oh hey')
      .should.equal(':oh hey\n\n')
  })
})