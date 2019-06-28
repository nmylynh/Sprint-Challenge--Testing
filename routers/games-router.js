const express = require('express');
const gamesDB = require('../models/games-model')
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const games = await gamesDB.find();

        res.status(200).json(games);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const game = await gamesDB.findById(id);

        res.status(200).json(game);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 

router.post('/', async (req, res) => {
    try {
        const newGame = await gamesDB.add(req.body);

        res.status(201).json(newGame);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updateGame = await gamesDB.update(id, req.body);

        updateGame
        ? res.status(200).json({ message: 'successfully updated game' })
        : res.status(404).json({ message: 'game not found'})
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const success = await gamesDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});



module.exports = router;