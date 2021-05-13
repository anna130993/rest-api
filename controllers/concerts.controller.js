const Concert = require('../models/concert.model');
const Day = require('../models/day.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find().populate('day'));
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id).populate('day');
        if(!con) res.status(404).json({message: 'Not found'});
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.post = async (req, res) => {
    const {performer, genre, price, day, image} = req.body;
    try {
        const newConcert = new Concert({performer, genre, price, day, image});
        await newConcert.save();
        res.json({message: 'OK'});
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.put = async (req, res) => {
    const {performer, genre, price, day, image} = req.body;
    try {
        const con = await (Concert.findById(req.params.id));
        if(con) {
            con.performer = performer;
            con.genre = genre;
            con.price = price;
            con.day = day;
            con.image = image;
            const newCon = await con.save();
            res.json(newCon);
        }
        else res.status(404).json({message: 'Not found'});
    }
    catch(err){
        res.status(500).json({message: err});
    }   
};

exports.delete = async (req, res) => {
    try {
        const con = await (Concert.findById(req.params.id));
        if (con) {
            await con.remove();
            res.json(con);
        }
        else res.status(404).json({message: 'Not found'});
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};