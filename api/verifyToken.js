const jwt = require('jsonwebtoken');

function verifyt(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.AES_KEY, (err, user) => {
      if (err) {
        res.status(403).json('Token is not vaild!');
      }
      req.user = user;
      //   console.log(user);
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated!!');
  }
}
module.exports = verifyt;
