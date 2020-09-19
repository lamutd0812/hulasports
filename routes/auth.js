const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/auth/signup', authController.signup);
router.post('/auth/signin', authController.signin);

module.exports = router;