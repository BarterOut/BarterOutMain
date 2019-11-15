require('dotenv').config();

import auth from '../../../auth';

const mockReq1 = {
  headers: {
    authorization: 'Token sdghdgk',
  }
}

const mockReq2 = {
  headers: {
    authorization: 'sdefge',
  }
}

const valid_token = process.env.VALID_JWT;
const mockReq3 = {
  headers: {
    authorization: `Token ${valid_token}`,
  }
}

global.next = function(req, res) {
  console.log('fasf'); // eslint-disable-line
  return req;
}

describe('auth should work', () => {
  test('bad JWT 1', () => {
    const res = auth.required(mockReq1);
  });
  // test('bad JWT 2', async () => {
  //   const response = await request(app).get('/api/books/getBooksNoToken');
  //   expect(response.statusCode).toBe(200);
  // });
  // test('valid JWT', async () => {
  //   const response = await request(app).get('/api/books/search');
  //   expect(response.statusCode).toBe(200);
  // });
});
