const supertest = require('supertest');

const server = require('./server.js');

describe('server', () => {
    describe('GET /', () => {
        it('responds with 200 OK', () => {
            return supertest(server)
                .get('/')
                .expect(200);
            });
        it('responds with content type json', () => {
            return supertest(server)
                .get('/')
                .expect('Content-Type', /json/i);
            });
        it('should return a JSON object from the index route', async () => {
            const thisIsPatrick = { message: 'HELLO THIS IS PATRICK' };
            const response = await supertest(server).get('/');

            expect(response.body).toEqual(thisIsPatrick);   
        });
    });
});
