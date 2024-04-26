const express = require('express');

const { app } = require('./app/app');
//const { pool } = require('./db/db');
const { PORT } = require('./utils/constants/server_constants');
const worksRouter = require('./routes/works.routes');

/* pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
  } else {
    console.log('Результат запроса:', result.rows[0]);
  }
}); */

app.use(express.json());

app.use('/works', worksRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
