const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  if (item) res.json(item);
  else res.status(404).json({ message: 'Page not found'});
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if (day && seat && client && email) {
    const id = uuidv4();
    db.seats.push({ id, day, seat, client, email });
    res.json({ message: 'OK' });
  }
  else res.status(404).json({ message: 'Page not found' });
});

router.route('/seats/:id').put((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  const { day, seat, client, email } = req.body;

  if (item && day && seat && client && email) {
    Object.assign(item, { day, seat, client, email });
    res.json({ message: 'OK' });
  }
  else res.status(404).json({ message: 'Page not found' });
});

router.route('/seats/:id').delete((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  if (item) {
    db.seats.splice(db.seats.indexOf(item), 1);
    res.json({ message: 'OK' });
  }
  else res.status(404).json({ message: 'Page not found' });
});

module.exports = router;