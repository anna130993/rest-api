const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const db = require ('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const item = db.concerts.find(item => item.id === req.params.id);

    if(item) res.json(item);
    else res.status(404).json({message: 'Page not found'});
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, image} = req.body;
    const price = parseInt(req.body.price);
    const day = parseInt(req.body.day);

    if(performer && genre && price && day && image) {
        const id = uuidv4();
        db.concerts.push({id, performer, genre, price, day, image});
        res.status(201).json({message: 'Created'});
    } else res.status(400).json({message: 'Bad request'});
});

router.route('/concerts/:id').put((req, res) => {
    const item = db.concerts.find(item => item.id === req.params.id);
    const {performer, genre, image} = req.body;
    const price = parseInt(req.body.price);
    const day = parseInt(req.body.day);

    if(item && performer && genre && price && day && image) {
        Object.assign(item, {performer, genre, price, day, image});
        res.json({message: 'OK'});
    } 
    else if(!item) res.status(404).json({message: "Page not found"});
    else res.status(400).json({message: "Bad request"})
});

router.route('/concerts/:id').delete((req, res) => {
    const item = db.concerts.find(item => item.id === req.params.id);

    if(item) {
        db.concerts.splice(db.concerts.indexOf(item), 1);
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

module.exports = router;