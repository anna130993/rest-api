const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const i = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[i]);
});

router.route('/testimonials/:id').get((req, res) => {
    const item = db.testimonials.find(item => item.id === req.params.id);
    
    if(item) res.json(item);
    else res.status(404).json({message: 'Page not found'});
});

router.route('/testimonials').post((req, res) => {
    const {author, text} = req.body;

    if(author && text) {
        const id = uuidv4();
        db.testimonials.push({id, author, text});
        res.status(201).json({message: 'Created'});
    } else res.status(400).json({message: 'Bad request'});
});

router.route('/testimonials/:id').put((req, res) => {
    const item = db.testimonials.find(item => item.id === req.params.id);
    const {author, text} = req.body;

    if(item && author && text) {
        item.author = author;
        item.text = text;
        res.json({message: 'OK'});
    } else if (!item) res.status(404).json({message: 'Page not found'});
    else res.status(400).json({message: "Bad request"});
});

router.route('/testimonials/:id').delete((req, res) => {
    const item = db.testimonials.find(item => item.id === req.params.id);

    if(item) {
        db.testimonials.splice(db.testimonials.indexOf(item), 1);
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

module.exports = router;