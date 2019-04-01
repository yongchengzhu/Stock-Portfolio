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
        <div className="item" key={stock.symbol}>
          <div className="right floated content">{formatter.format(stock.value)}</div>
          {stock.symbol.toUpperCase()} - {stock.shares} Shares
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
        <h2 className="ui header">Portfolio ({formatter.format(totalWorth)})</h2>
        <div className="ui relaxed divided list">
          {this.renderOwned()}
        </div>
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