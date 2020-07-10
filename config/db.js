const mogoose = require('mongoose');

const connectDB = async () => {
  const conn = await mogoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    `MongoDB Connected: ${conn.connection.host}`.brightGreen.bold.underline
  );
};

module.exports = connectDB;
