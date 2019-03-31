//------------------------------------------------------------------------------------------------
// External Dependencies
//------------------------------------------------------------------------------------------------
const passport        = require('passport');

//------------------------------------------------------------------------------------------------
// Internal Dependencies
//------------------------------------------------------------------------------------------------
const Authentication  = require('./controllers/authentication');
const passportService = require('./services/passport');
const Stock           = require('./controllers/stock');

//------------------------------------------------------------------------------------------------
// Middlewares
//------------------------------------------------------------------------------------------------

// Tells passport to use JWT strategy and don't create cookie session if user is authenticated.
const requireAuth = passport.authenticate('jwt', { session: false });
// Tells passport to use Local Strategy and don't create cookie session if user is authenticated.
const requireSignin = passport.authenticate('local', { session: false});

//------------------------------------------------------------------------------------------------
// Route Handlers
//------------------------------------------------------------------------------------------------

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res, next) {
    res.send('Stock Portfolio server.');
  });

  app.post('/signin', requireSignin, Authentication.signin);
  
  app.post('/signup', Authentication.signup);

  app.get('/balance', requireAuth, function(req, res) {
    res.send({ balance: req.user.balance });
  });

  app.post('/buy', requireAuth, Stock.buy);
}
