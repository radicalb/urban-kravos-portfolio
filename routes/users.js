const router = require('express').Router();
let User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

/* 
// POST route to register a user --DISABLED
router.route('/register').post((req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  user.save(err => {
    if (err) {
      res.status(500).send('Error registering new user please try again.');
      console.log(err);
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
}); */

//POST route to authenticate user
router.route('/authenticate').post((req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });

          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

//check token
const checkToken = require('../middleware/checkToken');

router
  .use(checkToken)
  .route('/checkToken')
  .get((req, res) => {
    res.sendStatus(200);
  });

module.exports = router;
