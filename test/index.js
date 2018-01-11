var dnsPrefetchControl = require('..')

var assert = require('assert')
var connect = require('connect')
var request = require('supertest')

describe('dnsPrefetchControl', function () {
  function use () {
    var result = connect()
    result.use(dnsPrefetchControl.apply(null, arguments))
    result.use(function (req, res) {
      res.end('Hello world!')
    })
    return result
  }

  it('continues onto the following middleware', function () {
    var app = use()

    return request(app).get('/')
      .expect('Hello world!')
  })

  it('sets the header to "off" by default', function () {
    var app = use()

    return request(app).get('/')
      .expect('X-DNS-Prefetch-Control', 'off')
  })

  it('can set header to "off" with configuration', function () {
    var app = use({ allow: false })

    return request(app).get('/')
      .expect('X-DNS-Prefetch-Control', 'off')
  })

  it('can set header to "on" with configuration', function () {
    var app = use({ allow: true })

    return request(app).get('/')
      .expect('X-DNS-Prefetch-Control', 'on')
  })

  it('names its function and middleware', function () {
    assert.equal(dnsPrefetchControl.name, 'dnsPrefetchControl')
    assert.equal(dnsPrefetchControl().name, 'dnsPrefetchControl')
  })
})
