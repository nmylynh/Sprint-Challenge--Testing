const supertest = require('supertest');
const router = require('./games-router');

describe('games router', () => {
    describe('GET request to /', () => {
        it('responds with 200 OK', () => {
            supertest(router)
                .get('/')
                .expect(200);
        });
        it('is JSON content', () => {
            supertest(router)
                .get('/')
                .expect('Content-Type', /json/i)
        })
        it('should return a specific object from id', () => {
            supertest(router)
                .get('/1')
                .expect(200)
                .expect('Content-Type', /json/i);
        });
        it('should return status 404 if id does not exist', () => {
            supertest(router)
                .get('/7')
                .expect(404)
                .expect('Content-Type', /json/i);
        });
    });
    describe('POST request to /', () => {
        it('should respond with 201 created', () => {
            const data = {
                "title": "Grand Theft Auto",
                "genre": "ACTION RPG",
                "releaseYear": 1997
            }
            supertest(router)
                .post('/')
                .send(data)
                .expect(201)
                .expect('Content-Type', /json/i);
        });
        it('should respond with 400 not created', () => {
            const data = {
                "title": "Grand Theft Auto",
                "releaseYear": 1997
            }
            supertest(router)
                .post('/')
                .send(data)
                .expect(400)
                .expect('Content-Type', /json/i);
        });
    });
});