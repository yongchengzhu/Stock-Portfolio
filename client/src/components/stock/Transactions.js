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
        <div key={stock.symbol}>
          {stock.activity} {stock.symbol} - {stock.shares} @ {stock.at}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Transactions</h2>
        {this.renderTransactions()}
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