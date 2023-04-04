const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./server')

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, 'hello')
    t.end()
  })
})

tape('should respond with user agent', (t) => {
  jsonist.get(`${urlBase}/user-agent`,{headers:{'user-agent':'TestCase'}}, (err, body) => {
    if (err) t.error(err)
    console.log(body)
    t.equal(body.userAgent, 'TestCase')
    t.end()
  })
})

tape('should respond base64 of hello', (t) => {
  jsonist.get(`${urlBase}/base64`, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, Buffer.from("hello").toString('base64'))
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
