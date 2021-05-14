const Seat = require('../models/seat.model');
const Day = require('../models/day.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find().populate('day'));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const s = await Seat.findById(req.params.id).populate('day');
    if (!s) res.status(404).json({ message: 'Not found' });
    else res.json(s);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { seat, client, email, day } = req.body;
  try {
    await Day.exists({_id: day});
    const isTaken = await Seat.exists({day: day, seat: seat});
    if (isTaken) {
      res.status(409).json({ message: "The slot is already taken..." });
    } else {
      const newSeat = new Seat({ seat, client, email, day });
      const saved = await newSeat.save();
      res.status(201).json(saved);
      const seats = await Seat.find().populate('day');
      req.io.emit('seatsUpdated', seats);
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { seat, client, email, day } = req.body;
  try {
    await Day.exists({_id: day});
    const isTaken = await Seat.exists({ day: day, seat: seat });
    if (isTaken) {
      res.status(409).json({ message: "The slot is already taken..." });
    } else {
      const s = await (Seat.findById(req.params.id));
      if (s) {
        Object.assign(s, {seat, client, email, day});
        const newSeat = await s.save();
        res.json(newSeat);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const s = await (Seat.findById(req.params.id));
    if (s) {
      await s.remove();
      res.json(s);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};