
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Apex Legends', genre: 'FPS', releaseYear: 2019},
        {id: 2, title: 'LoL: Team Fight Tactics', genre:'RTS', releaseYear: 2019},
        {id: 3, title: 'DotA: Auto Chess', genre: 'RTS', releaseYear: 2019}
      ]);
    });
};
