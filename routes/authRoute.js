const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../controllers/authController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassowrd', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
