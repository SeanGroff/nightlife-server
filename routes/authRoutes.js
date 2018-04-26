const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.SECRET, {
    expiresIn: '1h',
  });
  res.redirect(`${process.env.CLIENT_URI}/?token=${token}`);
});

router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : undefined;

    const decoded = jwt.verify(token, process.env.SECRET);

    if (decoded) {
      res.status(200).send({ authorized: true });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send({ authorized: false });
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).send({ success: true });
});

module.exports = router;
