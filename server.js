const express = require('express');
const {v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const i = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[i]);
});

app.get('/testimonials/:id', (req, res) => {
    const item = db.testimonials.find(item => item.id == req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ message: 'Page not found'});
});

app.post('/testimonials', (req, res) => {
    const {author, text} = req.body;

    if(author && text) {
        const id = uuidv4();
        db.testimonials.push({id, author, text});
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

app.put('/testimonials/:id', (req, res) => {
    const item = db.testimonials.find(item => item.id == req.params.id);
    const {author, text} = req.body;

    if(item && author && text) {
        item.author = author;
        item.text = text;
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

app.delete('/testimonials/:id', (req, res) => {
    const item = db.testimonials.find(item => item.id == req.params.id);

    if(item) {
        db.testimonials.splice(db.testimonials.indexOf(item), 1);
        res.json({message: 'OK'});
    } else res.status(404).json({message: 'Page not found'});
});

app.use((req, res) => {
    res.status(404).json({message: 'Page not found'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});