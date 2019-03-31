import React from 'react';

import requireAuth from '../requireAuth';
import BuyForm from './BuyForm';
import OwnedStocks from './OwnedStocks';

class Portfolio extends React.Component {
  renderStocks() {
    return this.props.stocks.map((stock) => {
      return (
        <div key={stock.quote.symbol}>
          {stock.quote.symbol} {stock.quote.latestVolume} {stock.quote.latestPrice}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui grid">
        <div className="eight wide column">
          <OwnedStocks />
        </div>
        <div className="eight wide column">
          <BuyForm />
        </div>
      </div>
    );
  }
}

export default requireAuth(Portfolio);