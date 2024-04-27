const { Pool } = require('pg');
const {
  DB_USER_NAME,
  DB_HOST,
  DB,
  DB_PASSWORD,
  DB_PORT
} = require('../utils/constants/db_connection');

module.exports.pool = new Pool({
  user: DB_USER_NAME,
  host: DB_HOST,
  database: DB,
  password: DB_PASSWORD,
  port: DB_PORT
});
