const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'secret',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

module.exports = pool;
