var http = require('http')
var processInstructions = require('./src/processInstructions')

var port = 8080
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  processInstructions(req, res)
})

exports.start = function(callback) {
  server.listen(port, callback)
}

exports.stop = function(callback) {
  server.close(callback)
}

if(require.main === module) {
  server.listen(port)
}