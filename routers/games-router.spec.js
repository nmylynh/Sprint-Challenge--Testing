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
    describe('PUT request to /:id', () => {
        it('should respond with 200 with updated changes', () => {
            const data = { genre: 'FPS/BATTLE ROYALE' }
            supertest(router)
                .put('/1')
                .send(data)
                .expect(200)
                .expect('Content-Type', /json/i);
        });
        it('should respond with 404 not found with non-existent id', () => {
            supertest(router)
                .put('/7')
                .expect(404)
                .expect('Content-Type', /json/i);
        });
    });
    describe('DELETE request to /:id', () => {
        it('should respond with 204 no content on success', () => {
            supertest(router)
                .delete('/3')
                .expect(204)
        });
        it('should respond with 404 not found with non-existent id', () => {
            supertest(router)
                .delete('/7')
                .expect(404)
        });
    });
});