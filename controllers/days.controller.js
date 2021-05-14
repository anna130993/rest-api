const Day = require('../models/day.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Day.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Day.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const d = await Day.findOne().skip(rand);
    if (!d) res.status(404).json({ message: 'Not found' });
    else res.json(t);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const d = await Day.findById(req.params.id);
    if (!d) res.status(404).json({ message: 'Not found' });
    else res.json(d);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { number } = req.body;
  try {
    const newDay = new Day({ number });
    await newDay.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { number } = req.body;
  try {
    const d = await (Day.findById(req.params.id));
    if (d) {
      Object.assign(d, { number });
      const newDay = await d.save();
      res.json(newDay);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const d = await (Day.findById(req.params.id));
    if (d) {
      await d.remove();
      res.json(d);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};