const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const db = require ('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const item = db.concerts.find(item => item.id == req.params.id);

    if(item) res.json(item);
    else res.status(404).json({message: 'Page not found'});
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day, image} = req.body;

    if(performer && genre && price && day && image) {
        const id = uuidv4();
        db.concerts.push({id, performer, genre, price, day, image});
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

router.route('/concerts/:id').put((req, res) => {
    const item = db.concerts.find(item => item.id == req.params.id);
    const {performer, genre, price, day, image} = req.body;

    if(item && performer && genre && price && day && image) {
        Object.assign(item, {performer, genre, price, day, image});
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

router.route('/concerts/:id').delete((req, res) => {
    const item = db.concerts.find(item => item.id == req.params.id);

    if(item) {
        db.concerts.splice(db.concerts.indexOf(item), 1);
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

module.exports = router;