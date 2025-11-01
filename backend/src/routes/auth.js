const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req,res)=>{
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const u = new User({ name, email, passwordHash: hash });
  await u.save();
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: u._id, email: u.email, name: u.name } });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: u._id, email: u.email, name: u.name } });
});

module.exports = router;
