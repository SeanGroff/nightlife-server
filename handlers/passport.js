const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const UserModel = require('../models/UserModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://www.example.com/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      UserModel.findOrCreate({ googleId: profile.id }, (err, user) =>
        cb(err, user)
      );
    }
  )
);
