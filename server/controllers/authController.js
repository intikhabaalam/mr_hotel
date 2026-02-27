const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' });

// Register User
const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      res.status(400);
      throw new Error("Please Fill All Details");
    }

    if (phone.length !== 10) {
      res.status(400);
      throw new Error('Please Enter Valid Phone Number');
    }

    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });

    if (emailExist || phoneExist) {
      res.status(400);
      throw new Error('User Already Exist');
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = await User.create({ name, email, phone, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      token: generateToken(user._id)
    });

  } catch (err) {
    next(err);
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please Fill All Details');
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      res.status(403);
      throw new Error('Account Disabled!');
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      token: generateToken(user._id)
    });

  } catch (err) {
    next(err);
  }
};

// Private Controller
const privateController = async (req, res) => {
  res.json({
    msg: "I am a private route, only accessible by logged-in users",
    user: req.user
  });
};

module.exports = { registerUser, loginUser, privateController };