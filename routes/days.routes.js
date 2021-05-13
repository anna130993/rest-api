const express = require('express');
const router = express.Router();
const DaysController = require('../controllers/days.controller');

router.route('./days').get(DaysController.getAll);
router.route('./days/random').get(DaysController.getRandom);
router.route('./days/:id').get(DaysController.getById);
router.route('/days').post(DaysController.post);
router.route('./days/:id').put(DaysController.put);
router.route('./days/:id').get(DaysController.delete);

module.exports = router;