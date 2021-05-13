const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(!conc) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(conc);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(!conc) {
      res.status(404).json({ message: 'Not found' });
    } else {
      const { performer, genre, price, day, image } = req.body;
      await Concert.updateOne({ _id: req.params.id }, { $set: {
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
      }});
      res.json({
        message: 'OK',
        updatedConcert: await Concert.findById(req.params.id),
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(!conc) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({
        message: 'OK',
        deletedConcert: await conc,
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};