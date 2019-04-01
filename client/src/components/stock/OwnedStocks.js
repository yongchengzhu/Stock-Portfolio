import React from 'react';
import { connect } from 'react-redux';

import { fetchOwned, fetchBatch } from '../../actions';
import { formatter } from '../../utilities';

class OwnedStocks extends React.Component {
  componentDidMount() {
    this.props.fetchOwned();

    this.setInterval = setInterval(() => {
      let batch = '';
      for (let i = 0; i < this.props.owned.length; ++i) {
        batch += this.props.owned[i].symbol;
        if (i < this.props.owned.length-1) {
          batch += ',';
        }
      }

      if (batch.length > 0) {
        this.props.fetchBatch(batch);
      }
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.setInterval);
  }

  renderOwned() {
    return this.props.owned.map((stock) => {
      let color = 'black';
      if (this.props.batch[stock.symbol.toUpperCase()]) {
        // console.log(this.props.batch[stock.symbol.toUpperCase()].quote.open);
        const open = this.props.batch[stock.symbol.toUpperCase()].quote.open;
        const current = this.props.batch[stock.symbol.toUpperCase()].quote.latestPrice;
        if (current < open) {
          color = 'red';
        } else if (current === open) {
          color = 'grey';
        } else {
          color = 'green';
        }
      }
      
      return (
        <div className="item" key={stock.symbol}>
          <div style={{color: color}} className="right floated content">{formatter.format(stock.value)}</div>
          <span style={{color: color}}>{stock.symbol.toUpperCase()}</span> - {stock.shares} Shares
        </div>
      );
    });
  }

  render() {
    // console.log(this.props.batch['AAPL']);
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
    owned: Object.values(state.user.owned),
    batch: state.stock.batch
  }
}

export default connect(mapStateToProps, { fetchOwned, fetchBatch })(OwnedStocks);