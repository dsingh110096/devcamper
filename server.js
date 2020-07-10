const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//middleware file
const logger = require('./middleware/logger');

//Route files
const bootcamps = require('./routes/bootcamps');

//Loading env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

//accessing env variable using process.env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.clear();
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
