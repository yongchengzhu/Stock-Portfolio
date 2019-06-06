//------------------------------------------------------------------------------------------------
// Internal Dependencies
//------------------------------------------------------------------------------------------------

const config = require('../config');
const User   = require('../models/user');
const jwt    = require('jwt-simple');

// 
// tokenForUser:
//   Generates a json web token with the _id from user model. We are encoding the user id with
//   our secret string from config.js. We want to return a token to the browser whenever user
//   has successfully signed up or signed in.
// 
function tokenForUser(user) {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

//
// Signup Callback:
//   Receives a request object with name, email, and password properties. Then, check if all three
//   fields are filled by the user. Then, it takes the user's email address and look into the
//   database to check if this email already exists. If it exists, then return error. If not, then
//   create a new user model instance with all three properties and save it inside of the database.
//   Finally, after it is successfully saved, return some response back to the user.
// 
exports.signup = function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(422).send({ error: 'You must provide all fields!' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }
    
    if (existingUser) { 
      return res.status(422).send({ error: 'Email is in use!'});
    }

    const user = new User({
      name: name,
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    });
  });
}

// 
// Signin Callback:
//   If user signs in and Local Strategy authorizes the user to get pass, then send jwt token
//   back as a response.
// 
exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}