const express = require('express');

const { app } = require('./app/app');

const { PORT } = require('./utils/constants/server_constants');
const worksRouter = require('./routes/works.routes');

app.use(express.json());

app.use('/works', worksRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
