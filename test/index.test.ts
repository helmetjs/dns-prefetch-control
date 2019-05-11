import connect from 'connect';
import request from 'supertest';
import { IncomingMessage, ServerResponse } from 'http';

import dnsPrefetchControl = require('..')

function app (middleware: ReturnType<typeof dnsPrefetchControl>): connect.Server {
  const result = connect();
  result.use(middleware);
  result.use((_req: IncomingMessage, res: ServerResponse) => {
    res.end('Hello world!');
  });
  return result;
}

describe('dnsPrefetchControl', () => {
  it('continues onto the following middleware', () => {
    return request(app(dnsPrefetchControl())).get('/')
      .expect('Hello world!');
  });

  it('sets the header to "off" by default', () => {
    return request(app(dnsPrefetchControl())).get('/')
      .expect('X-DNS-Prefetch-Control', 'off');
  });

  it('can set header to "off" with configuration', () => {
    return request(app(dnsPrefetchControl({ allow: false }))).get('/')
      .expect('X-DNS-Prefetch-Control', 'off');
  });

  it('can set header to "on" with configuration', () => {
    return request(app(dnsPrefetchControl({ allow: true }))).get('/')
      .expect('X-DNS-Prefetch-Control', 'on');
  });

  it('names its function and middleware', () => {
    expect(dnsPrefetchControl.name).toBe('dnsPrefetchControl');
    expect(dnsPrefetchControl().name).toBe('dnsPrefetchControl');
  });
});
