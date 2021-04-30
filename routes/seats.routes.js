const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const item = db.seats.find(item => item.id === req.params.id);
  if (item) res.json(item);
  else res.status(404).json({ message: 'Page not found' });
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email } = req.body;
  const item = db.seats.find(item => (item.day === day) && (item.seat === seat));

  if(item) {
    res.status(409).json({message: 'The slot is already taken...'});
  } else {
    if(day && seat && client && email) {
      db.seats.push({id: uuidv4(), day, seat, client, email});
      res.json({message: 'OK'});
    } else {
      res.status(404).json({message: 'Page not found'});
    }
  }
});

router.route('/seats/:id').put((req, res) => {
  const item = db.seats.find(item => item.id === req.params.id);
  const { client, email } = req.body;
  const day = parseInt(req.body.day);
  const seat = parseInt(req.body.seat);

  if (item && day && seat && client && email) {
    if (db.seats.some(booking => booking.seat === seat && booking.day === day)) {
      res.status(409).json({ message: "The slot is already taken! Try another!" });
    } else {
      Object.assign(item, { day, seat, client, email });
      res.json({ message: 'OK' });
    }
  }
  else if (!item) res.status(404).json({ message: 'Page not found' });
  else res.status(400).json({ message: 'Bad request' });
});

router.route('/seats/:id').delete((req, res) => {
  const item = db.seats.find(item => item.id === req.params.id);
  if (item) {
    db.seats.splice(db.seats.indexOf(item), 1);
    res.json({ message: 'OK' });
  }
  else res.status(404).json({ message: 'Page not found' });
});

module.exports = router;