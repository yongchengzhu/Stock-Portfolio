import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import { fetchBalance, buyStock } from '../../actions';

class BuyForm extends React.Component {
  componentDidMount() {
    this.props.fetchBalance();
  }

  onSubmit = (formProps) => {
    this.props.buyStock(formProps);
  }

  render() {
    // if (this.props.user.owned) {
    //   console.log(Object.values(this.props.user.owned));
    // }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    const { handleSubmit } = this.props;

    return (
      <div>
        Cash - {formatter.format(this.props.user.balance)}
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>
              Ticker
            </label>
            <Field name="ticker" type="text" component="input" autoComplete="off" />
          </fieldset>
          <fieldset>
            <label>
              Quantity
              <Field name="quantity" type="number" min="0" component="input" autoComplete="off" />
            </label>
          </fieldset>
          {this.props.user.errorMessage}
          <button>Buy</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default compose (
  connect(mapStateToProps, { fetchBalance, buyStock }),
  reduxForm({ form: 'buy' })
)(BuyForm);