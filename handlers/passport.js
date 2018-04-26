const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const UserModel = require('../models/UserModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    console.log(err);
  }
});

// https://github.com/jaredhanson/passport-google-oauth2
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await UserModel.findOne({
          googleId: profile.id,
        });

        if (currentUser) {
          // user exists in db
          return done(null, currentUser);
        } else {
          // create new user
          const newUser = await new UserModel({
            googleId: profile.id,
          }).save();

          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);
