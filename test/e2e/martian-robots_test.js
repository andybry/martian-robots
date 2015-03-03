var superagent = require('superagent')
var server = require('../../index')
var assert = require('assert')

describe('Martian Robots', function() {

  before('start the server', function(done) {
    server.start(done)
  })

  it('should move robots to the correct positions for the given sample data', function(done) {
    superagent
      .post('http://localhost:8080/')
      .send([
        '5 3',
        '1 1 E',
        'RFRFRFRF',
        '',
        '3 2 N',
        'FRRFLLFFRRFLL',
        '',
        '0 3 W',
        'LLFFFLFLFL',
        ''
      ].join('\n')).end(function(error, res) {
        if(error) throw error
        assert.equal(res.text, [
          '1 1 E',
          '3 3 N LOST',
          '2 3 S',
          ''
        ].join('\n'))
        done()
      })
  })

  after('stop the server', function(done) {
    server.stop(done)
  })

})