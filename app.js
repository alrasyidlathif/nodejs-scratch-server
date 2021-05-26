const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<header><title>lathif code</title></header>')
    res.write('<body><h1>hello world</h1></body>')
    res.write('</html>')
    res.end()
    // process.exit()
})

server.listen(1100)
