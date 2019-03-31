//------------------------------------------------------------------------------------------------
// Internal Dependencies
//------------------------------------------------------------------------------------------------
const User = require('../models/user');

exports.buy = function (req, res, next) {
  let newUpdates = req.user;
  newUpdates.balance = req.user.balance - (req.body.quantity * req.body.price);

  User.findByIdAndUpdate(req.user._id, newUpdates, function(err, foundUser) {
    if(err) { return next(err); }
  });

  res.send({ balance: req.user.balance });
}