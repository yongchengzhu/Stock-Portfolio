import React from 'react';
import { connect } from 'react-redux';

import requireAuth from '../requireAuth';
import { fetchStocks, fetchBalance } from '../../actions';

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.fetchStocks();
    this.props.fetchBalance();
  }

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
      <div>
        <h1>Portfolio Page</h1>
        {this.renderStocks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    stocks: Object.values(state.stocks),
    balance: state.user.balance
  }
}

export default connect(mapStateToProps, { fetchStocks, fetchBalance })(requireAuth(Portfolio));