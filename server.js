const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Loading env variables
dotenv.config({ path: './config/config.env' });

//Connection to mongoDB
connectDB();

//middleware file
const errorHandler = require('./middleware/error');

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body Parser to access (req.body)
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

//accessing env variable using process.env
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.clear();
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightWhite.bold.underline
  );
});

//handling unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err}`.bgWhite.brightRed.bold.underline);
  //close server & exit process
  server.close(() => process.exit(1));
});
