const express = require('express');
const router = express.Router();
const SenAggController = require('../controllers/senAggController.js')

router.get('/', SenAggController.getAll)

module.exports = router;