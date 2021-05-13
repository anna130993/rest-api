const Seat = require('../models/seat.model');
const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find().populate('concert'));
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getById = async (req, res) => {
    try {
        const seating = await Seat.findById(req.params.id).populate('concert');
        if(!seating) res.status(404).json({message: 'Not found'});
        else res.json(seating);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.post = async (req, res) => {
    const {seat, client, email, concert} = req.body;
    try {
        await Concert.exists({_id: concert});
        const isTaken = await Seat.exists({concert: concert, seat: seat});
        if(isTaken) {
            res.status(409).json({message: 'This slot is already taken! Try another!'});
        } else {
            const newSeat = new Seat ({seat, client, email, concert});
            await newSeat.save();
            res.json({message: 'OK'});
        }
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.put = async (req, res) => {
    const {seat, client, email, concert} = req.body;
    try {
        await Concert.exists({_id: concert});
        const isTaken = await Seat.exists({concert: concert, seat:seat});
        if(isTaken) {
            res.status(409).json({message: 'This slot is already taken! Try another!'});
        } else {
            const seating = await (Seat.findById(req.params.id));
            if (seating) {
                seating.seat = seat;
                seating.client = client;
                seating.email = email;
                seating.concert = concert;
                const newSeat = await seating.save();
                res.json(newSeat);
            }
            else res.status(404).json({message: 'Not found'});
        }
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.delete = async (req, res) => {
    try {
        const seating = await (Seat.findById(req.params.id));
        if(seating) {
            await seating.remove();
            res.json(seating);
        }
        else res.status(404).json({message: 'Not found'});
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};