const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const fileupload = require('express-fileupload');
const colors = require('colors');
const connectDB = require('./config/db');

//Loading env variables
dotenv.config({ path: './config/config.env' });

//Connection to mongoDB
connectDB();

//custom middleware file
const errorHandler = require('./middleware/error');

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();

//Body Parser to access (req.body)
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File upload
app.use(fileupload());

//Mongo Sanitize Data
app.use(mongoSanitize());

//Adding Security headers
app.use(helmet());

//Prevent xss attacts
app.use(xss());

//Prevent http param polution
app.use(hpp());

//Set static folder
app.use(express.static(path.join(__dirname, 'public/uploads')));

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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
