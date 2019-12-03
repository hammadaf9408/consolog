const express = require('express');
const {
  getMe,
  updateDetails
} = require('../controllers/userController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
router.use(protect);

router.put('/updatedetails', updateDetails);
router.get('/me', getMe);

module.exports = router;
