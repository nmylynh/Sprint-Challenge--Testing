const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('games');
}

function findById(id) {
    return db('games')
    .where({ id })
    .first()
}

async function add(games) {
const [id] = await db('games').insert(games);

return findById(id);
}

function update(id, changes) {
    return db('games')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('games')
    .where({ id })
    .del();
}