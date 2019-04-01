import React from 'react';
import { connect } from 'react-redux';

import { fetchOwned } from '../../actions'

class OwnedStocks extends React.Component {
  componentDidMount() {
    this.props.fetchOwned();
  }

  renderOwned() {
    return this.props.owned.map((stock) => {
      return (
        <div key={stock.symbol}>
          {stock.symbol} {stock.shares} {stock.value}
        </div>
      );
    });
  }

  render() {
    console.log(this.props.owned);
    return (
      <div>
        Owned Stocks
        {this.renderOwned()}
      </div>
    );
  }
}
// 
const mapStateToProps = (state) => {
  return {
    owned: Object.values(state.user.owned)
  }
}

export default connect(mapStateToProps, { fetchOwned })(OwnedStocks);