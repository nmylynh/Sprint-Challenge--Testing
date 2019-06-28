// our connection to the database
const db = require('../data/dbConfig.js');

// the data access file we are testing
const { add, find, findById, update, remove } = require('./games-model');

describe('games model', () => {
    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('games').truncate();
      });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('post request, add()', () => {
        it('should add the provided games into the db', async () => {
            //arrange
            await add({ title: 'BloodBorne', genre: 'ACTION RPG', releaseYear: 2015 });
            await add({ title: 'Borderlands', genre: 'FPS/RPG', releaseYear: 2009 });
            await add({ title: 'ARK: Survival Evolved', genre: 'SURVIVAL RPG', releaseYear: 2017 });

            //act
            const games = await db('games');

            //assert
            expect(games).toHaveLength(3);
        });
        it('should add the provided game', async () => {
            const game = { title: 'Final Fantasy XIV', genre:'MMORPG', releaseYear: 2010 };

            const added = await add(game);

            const games = await db('games');

            expect(added.title).toBe(game.title);
        });
    });
    describe('get request, find()', async () => {
        it('should return all games', async () => {
        
            await add({ title: 'BloodBorne', genre: 'ACTION RPG', releaseYear: 2015 });
            await add({ title: 'Borderlands', genre: 'FPS/RPG', releaseYear: 2009 });
            await add({ title: 'ARK: Survival Evolved', genre: 'SURVIVAL RPG', releaseYear: 2017 });

            const games = await find();
            
            expect(games).toHaveLength(3);
        });
        it('should be an empty array', async () => {
            const games = await db('games');
            
            expect(games).toEqual([]);
        })
    });
    describe('get request, findById()', async () => {
        it('should return a game that matches the id', async () => {
            
            await add({ title: 'BloodBorne', genre: 'ACTION RPG', releaseYear: 2015 });
            
            const game = await findById(1);
            
            expect(game.title).toBe('BloodBorne');
        });

        it('should return a game that matches the id of genre', async () => {
        
            await add({ title: 'BloodBorne', genre: 'ACTION RPG', releaseYear: 2015 });
            await add({ title: 'Borderlands', genre: 'FPS/RPG', releaseYear: 2009 });
            await add({ title: 'ARK: Survival Evolved', genre: 'SURVIVAL RPG', releaseYear: 2017 });
            
            const game = await findById(3);
            
            expect(game.genre).toBe('SURVIVAL RPG');
        });
    });
    describe('put request, update()', async () => {
        it('should return updated content with changes', async () => {
            //arrange
            await add({ title: 'Blood Brawn', genre: 'GORE RPG', releaseYear: 2015 });
            await update(1, { title: 'Bloodborne', genre: 'ACTION RPG' });

            //act
            const game = await findById(1);

            //assert
            expect(game.title).toBe('Bloodborne');
            expect(game.genre).toBe('ACTION RPG');
            expect(game.releaseYear).toBe(2015);
        });
    });
    describe('delete request, remove()', async () => {
        it('should delete the game', async () => {
           //add, length 3
            await add({ title: 'BloodBorne', genre: 'ACTION RPG', releaseYear: 2015 });
            await add({ title: 'Borderlands', genre: 'FPS/RPG', releaseYear: 2009 });
            await add({ title: 'ARK: Survival Evolved', genre: 'SURVIVAL RPG', releaseYear: 2017 });

            //delete
            await remove(2);

            //grab
            const games = await find();
            
            //assert
            expect(games).toHaveLength(2);
        });
    });
});