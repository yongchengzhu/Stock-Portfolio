//------------------------------------------------------------------------------------------------
// External Dependencies
//------------------------------------------------------------------------------------------------
const Authentication  = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport        = require('passport');

//------------------------------------------------------------------------------------------------
// Middlewares
//------------------------------------------------------------------------------------------------

// Tells passport to use JWT strategy and don't create cookie session if user is authenticated.
const requireAuth = passport.authenticate('jwt', { session: false });

//------------------------------------------------------------------------------------------------
// Route Handlers
//------------------------------------------------------------------------------------------------

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res, next) {
    res.send('Stock Portfolio server.')
  });

  app.post('/signup', Authentication.signup);
}
