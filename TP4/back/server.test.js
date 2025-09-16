const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  it('GET /api/message debería devolver un mensaje', async () => {
    const res = await request(app).get('/api/message');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('GET /api/health debería devolver estado ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});