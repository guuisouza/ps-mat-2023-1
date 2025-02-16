const express = require('express');
const controller = require('../controllers/product');
const router = express.Router();

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;
