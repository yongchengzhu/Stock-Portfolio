//------------------------------------------------------------------------------------------------
// External Dependencies
//------------------------------------------------------------------------------------------------
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const passport    = require('passport');

//------------------------------------------------------------------------------------------------
// Internal Dependencies
//------------------------------------------------------------------------------------------------
const User = require('../models/user');
const config = require('../config');

// 
// jwtOptions:
//   Tells jwtLogin where to find the token. And the secret that was used to encode the token.
// 
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret    
};

// 
// jwtLogin:
//   A strategy that simply extracts the login user token from Header and decode it with out secret.
//   Then it gets back a 'payload' which contains the user id that we used to encode as a token.
//   It takes the user id and check if the user exists inside our databse. If it does exist, then
//   let this user pass and go to route handler.
// 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use JWT Strategy.
passport.use(jwtLogin);