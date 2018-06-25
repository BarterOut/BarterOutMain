module.exports = {
  // verify token format
  verifyTokenFormat: function verifyToken(req, res, next) {
    // Ger auth header value
    const bearerHeader = req.user.token;//change this later to header.authoriuzation
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // split at the space
      const bearer = bearerHeader.split(' ');
      // Get the token
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // console.log('verified');

      // Next middleware
      next();
    } else {
      res.send(403);
    }
  },

};
