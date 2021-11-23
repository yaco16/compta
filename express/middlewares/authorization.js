const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('token:', token);
  if (!token) {
    return res
    .status(403)
    .json('protected route')
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('data:', data);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = authorization;