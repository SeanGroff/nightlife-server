require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();

const PORT = process.env.PORT || 3334;

mongoose
  .connect(config.database)
  .then(() => console.log('Successfully connected to DB!'))
  .catch(err => console.log(`Error connecting to DB: ${err}`));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: config.database }),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use((err, req, res, next) => {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
