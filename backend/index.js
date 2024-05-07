const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { app } = require('./app/app');

const { PORT } = require('./utils/constants/server_constants');
const worksRouter = require('./routes/works.routes');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.single('file'));

app.use(express.json());

app.use(cors());

app.use('/works', worksRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
