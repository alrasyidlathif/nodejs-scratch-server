const fs = require('fs')

const reqResHandler = (req, res) => {
    console.log(req.url, req.method)
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<header><title>lathif code</title></header>')
        res.write(
        `<body>
            <form action="/message" method="POST">
            <text>name:</text>
            <input type="text" name="name">
            <text>message:</text>
            <input type="text" name="message">
            <button type="submit">Send</button>
            </form>
        </body>`
        )
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const data = parsedBody.split('&')
            const name = data[0].split('=')[1]
            const message = data[1].split('=')[1]
            const savedText = `name: ${name}, message: ${message}`
            // fs.writeFileSync('message.txt', message) // sync blocking next code
            fs.writeFile('message.txt', savedText, () => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                res.end()
            })
        })
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<header><title>lathif code</title></header>')
    res.write('<body><h1>hello world</h1></body>')
    res.write('</html>')
    return res.end()
    // process.exit()
}

module.exports = {
    reqResHandler
}