const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/seats').get(SeatController.getAll);

router.route('/seats/:id').get(SeatController.getById);

router.route('/seats').post(SeatController.post);

router.route('/seats/:id').put(SeatController.put);

router.route('/seats/:id').delete(SeatController.delete);

module.exports = router;
