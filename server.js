const express = require('express');
const dotenv = require('dotenv');

//Loading env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//accessing env variable using process.env
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
