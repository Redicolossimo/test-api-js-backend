const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config.json');
const logger = require('../services/logger')(module);
const pool = require('../db/postgres');

module.exports = {
  auth,
  register,
  login,
};

function auth(req, res) {
  const user = req?.body;

  if (!user) {
    logger.error('No user passed');
    return res.status(400).json({
      error: 'No user passed',
    });
  }

  const token = jwt.sign(
    user,
    config.app,
    {
      expiresIn: config.jwt_ttl,
    },
  );

  res.header('Authorization', `Bearer ${token}`);
  return res.status(200).end();
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length !== 0) {
      logger.error('User already exist');
      return res.status(401).json('User already exist');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword],
    );

    const token = jwt.sign(
      newUser.rows[0],
      config.app,
      {
        expiresIn: config.jwt_ttl,
      },
    );

    res.header('Authorization', `Bearer ${token}`);
    return res.json({ id: newUser.rows[0].id });
  } catch (e) {
    logger.error('Server Error');
    return res.status(500).send('Server Error');
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      logger.error('Password or email is incorrect');
      return res.status(401).send('Password or email is incorrect');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      logger.error('Password or email is incorrect');
      return res.status(401).send('Password or email is incorrect');
    }

    const token = jwt.sign(
      user.rows[0],
      config.app,
      {
        expiresIn: config.jwt_ttl,
      },
    );

    res.header('Authorization', `Bearer ${token}`);
    return res.json({ id: user.rows[0].id });
  } catch (e) {
    logger.error('Server Error');
    return res.status(500).send('Server Error');
  }
}
