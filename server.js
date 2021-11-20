const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(`💥Error Name💥: ${err.name}`);
  console.log(`💥💥Error Text: ${err.message}`);
  console.log('UNCAUGHT EXCEPTION! Shutting down!');
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

const db = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Servering on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`💥Error Name💥: ${err.name}`);
  console.log(`💥💥Error Text: ${err.message}`);
  console.log('UNHANDLED REJECTION! Shutting down!');
  server.close(() => {
    process.exit(1);
  });
});
