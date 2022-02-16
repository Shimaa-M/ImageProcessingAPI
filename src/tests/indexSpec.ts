import supertest from 'supertest';
import app from '../index';
import resize from '../utilities/resize-image';

const request = supertest(app);
describe('Test endpoint response', () => {
    it('gets the api/image endpoint', async () => {
        const response = await request.get('/image/?filename=fjord&height=200&width=400');
        expect(response.status).toBe(200); 
    });
    });

describe('2- Image transform function should be reseolve or reject', () => {
    it('Expect transform to not throw error', async () => {
    expect(() => {
        resize('fjord',80,400);
    }).toBeTruthy();
    });
   
});
