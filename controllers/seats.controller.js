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
    const seating = await Seat.findById(req.params.id).populate('day');
    if (!seating) res.status(404).json({ message: 'Not found' });
    else res.json(seating);
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
      res.status(409).json({ message: "The slot is already taken! Try another!" });
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
      res.status(409).json({ message: "The slot is already taken! Try another!" });
    } else {
      const seating = await (Seat.findById(req.params.id));
      if (seating) {
        seating.seat = seat;
        seating.client = client;
        seating.email = email;
        seating.day = day;
        const newSeat = await seating.save();
        res.json(newSeat);
      }
      else res.status(404).json({ message: 'Not found' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seating = await (Seat.findById(req.params.id));
    if (seating) {
      await seating.remove();
      res.json(seating);
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};