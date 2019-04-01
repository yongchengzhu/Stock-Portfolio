import React from 'react';
import { connect } from 'react-redux';

import { fetchTransactions } from '../../actions';

class Transactions extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  renderTransactions() {
    return this.props.transactions.map((stock) => {
      return (
        <div className="item" key={stock.symbol}>
          {stock.activity} {stock.symbol} - {stock.shares} @ {stock.at}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui grid">
        <div className="eight wide column">
          <h2 className="ui header">Transactions</h2>
          <div className="ui relaxed divided list">
            {this.renderTransactions()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.user.transactions
  }
};

export default connect(mapStateToProps, { fetchTransactions })(Transactions);