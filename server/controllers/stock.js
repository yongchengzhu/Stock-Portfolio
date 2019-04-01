//------------------------------------------------------------------------------------------------
// Internal Dependencies
//------------------------------------------------------------------------------------------------
const User = require('../models/user');

exports.buy = function (req, res, next) {
  let newUpdates = req.user;

  // Update Balance
  newUpdates.balance = req.user.balance - (req.body.quantity * req.body.price);

  // Update Transactions
  newUpdates.transactions.push({
    symbol: req.body.ticker,
    shares: req.body.quantity,
    at: req.body.price,
    activity: 'BUY'
  });

  // Update Owned Stocks
  if (!newUpdates.owned[req.body.ticker]) {
    const value = req.body.price * req.body.quantity;

    newUpdates.owned[req.body.ticker] = {
      symbol: req.body.ticker,
      shares: parseInt(req.body.quantity),
      value: value
    }
  } else {
    const newShares = newUpdates.owned[req.body.ticker].shares + parseInt(req.body.quantity);
    const newValue = req.body.price * newShares;

    newUpdates.owned[req.body.ticker].shares = newShares;
    newUpdates.owned[req.body.ticker].value = newValue;
  }

  // Save the updates
  User.findByIdAndUpdate(req.user._id, newUpdates, function(err, foundUser) {
    if(err) { return next(err); }
  });

  res.send({ balance: req.user.balance, owned: req.user.owned });
}