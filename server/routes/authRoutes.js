const express = require('express');
const { registerUser, loginUser, privateController } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/private", protect, privateController); // protected example

module.exports = router;