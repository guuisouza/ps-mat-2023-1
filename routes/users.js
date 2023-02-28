const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/', controller.create)
router.get('/', controller.retrieve)

module.exports = router;
