import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import { fetchBalance, buyStock } from '../../actions';
import { formatter } from '../../utilities';

class BuyForm extends React.Component {
  componentDidMount() {
    this.props.fetchBalance();
  }

  onSubmit = (formProps) => {
    this.props.buyStock(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2 className="ui header">Cash - {formatter.format(this.props.user.balance)}</h2>
        <form className="ui form" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="field">
            <label>
              Ticker
            </label>
            <Field name="ticker" type="text" component="input" autoComplete="off" />
          </div>
          <div className="field">
            <label>
              Quantity
              <Field name="quantity" type="number" min="0" component="input" autoComplete="off" />
            </label>
          </div>
          {this.props.user.errorMessage}
          <button className="ui button">Buy</button>
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