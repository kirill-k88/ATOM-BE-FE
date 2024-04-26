const { app } = require('./app/app');
const { pool } = require('./db/db');
const { PORT } = require('./utils/constants/server_constants');

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
  } else {
    console.log('Результат запроса:', result.rows[0]);
  }
});

app.get('/', (req, res) => {
  res.send('hellow men!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
