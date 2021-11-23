const jwt = require('jsonwebtoken');

function jwtTokens(user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'});
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});
  return({accessToken, refreshToken});
}

module.exports = jwtTokens;