import React from 'react';
import { connect } from 'react-redux';

import { fetchOwned } from '../../actions';
import { formatter } from '../../utilities';

class OwnedStocks extends React.Component {
  componentDidMount() {
    this.props.fetchOwned();
  }

  renderOwned() {
    return this.props.owned.map((stock) => {
      return (
        <div key={stock.symbol}>
          {stock.symbol} {stock.shares} {formatter.format(stock.value)}
        </div>
      );
    });
  }

  render() {
    let totalWorth = 0;

    for (let i = 0; i < this.props.owned.length; ++i) {
      totalWorth += this.props.owned[i].value;
    }

    return (
      <div>
        <h2>Portfolio {formatter.format(totalWorth)}</h2>
        {this.renderOwned()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    owned: Object.values(state.user.owned)
  }
}

export default connect(mapStateToProps, { fetchOwned })(OwnedStocks);