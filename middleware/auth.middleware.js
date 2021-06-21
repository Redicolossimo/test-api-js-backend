const httpContext = require('express-http-context');

const jwt = require('jsonwebtoken');
const logger = require('../services/logger')(module);

const config = require('../config.json');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      logger.error('Not authorized');
      return res.status(401).end();
    }

    const decoded = jwt.verify(token, config.app);
    req.user = decoded.user;
    httpContext.set('user', decoded?.user);
    return next();
  } catch (error) {
    logger.error('Not authorized');
    return res.status(401).end();
  }
};
