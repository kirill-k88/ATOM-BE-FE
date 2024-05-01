const express = require('express');
const cors = require('cors');

const { app } = require('./app/app');

const { PORT } = require('./utils/constants/server_constants');
const worksRouter = require('./routes/works.routes');

app.use(express.json());

app.use(cors());

app.use('/works', worksRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
