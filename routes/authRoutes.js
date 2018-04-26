const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3333?token=1234354647');
});

module.exports = router;
