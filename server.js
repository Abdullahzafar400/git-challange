const http = require('http')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondHello(req, res)
  if (req.url === '/user-agent') return respondUserAgent(req, res)
  if (req.url === '/base64') return respondBase64(req, res)

  res.end()
})

function respondHello (req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}
function respondUserAgent (req, res) {
  res.end(JSON.stringify({ userAgent: req.headers['user-agent'] }))
}

function respondBase64 (req, res) {
  res.end(JSON.stringify({ msg: Buffer.from("hello").toString('base64') }))
}

server.listen(PORT)
console.log(`Server listening on port ${PORT}`)

if (require.main !== module) module.exports = server
