import request from 'supertest';
import app from '../src/app';

jest.mock('../src/nlp/nlpService', () => ({
  processMessage: jest.fn().mockResolvedValue('Hey!'),
}));

describe('backend API', () => {
  test('returns a healthy status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('returns a chatbot response for a valid message', async () => {
    const response = await request(app)
      .get('/chatbot')
      .query({ message: 'hello' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: 'Hey!' });
  });

  test('rejects a missing message', async () => {
    const response = await request(app).get('/chatbot');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'The message query parameter is required',
    });
  });

  test('rejects messages longer than 500 characters', async () => {
    const response = await request(app)
      .get('/chatbot')
      .query({ message: 'a'.repeat(501) });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'The message must not exceed 500 characters',
    });
  });
});
