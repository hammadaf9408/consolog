const express = require('express');
const { getCategory, updateCategory } = require('../controllers/categoryController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
router.use(protect);

router.route('/').get(getCategory);
router.route('/:id').put(updateCategory);

module.exports = router;
