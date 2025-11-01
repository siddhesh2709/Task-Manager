const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req,res,next){
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error:'No auth' });
  const token = h.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).lean();
    if (!user) return res.status(401).json({ error:'Invalid' });
    req.user = user;
    next();
  } catch(e) { return res.status(401).json({ error:'Invalid token' }); }
}

module.exports = { authMiddleware };
