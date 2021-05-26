const http = require('http')

const routes = require('./routes')

const server = http.createServer(routes.reqResHandler)

server.listen(1100)
