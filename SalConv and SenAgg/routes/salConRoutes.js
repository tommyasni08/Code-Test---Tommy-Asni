const express = require('express')
const router = express.Router()
const SalConController = require('../controllers/salConController.js')

router.get('/', SalConController.getAll)
router.get('/:id', SalConController.getOne)

module.exports = router;