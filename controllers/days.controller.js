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
    const dayling = await Day.findOne().skip(rand);
    if (!dayling) res.status(404).json({ message: 'Not found' });
    else res.json(dayling);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dayling = await Day.findById(req.params.id);
    if (!dayling) res.status(404).json({ message: 'Not found' });
    else res.json(dayling);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const number = sanitize(req.body.number);
  
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
    const dayling = await (Day.findById(req.params.id));
    if (dayling) {
      dayling.number = number;
      const newDay = await dayling.save();
      res.json(newDay);
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dayling = await (Day.findById(req.params.id));
    if (dayling) {
      await dayling.remove();
      res.json(dayling);
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};