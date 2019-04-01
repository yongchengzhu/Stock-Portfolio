import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { signup } from '../../actions';

class Signup extends React.Component {
  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/portfolio');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="ui form" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="field">
          <label>Name</label>
          <Field name="name" type="text" component="input" autoComplete="off" />
        </div>        
        <div className="field">
          <label>Email</label>
          <Field name="email" type="text" component="input" autoComplete="off" />
        </div>
        <div className="field">
          <label>Password</label>
          <Field name="password" type="password"  component="input" autoComplete="off" />
        </div>
        <div>
          {this.props.errorMessage}
        </div>
        <button className="ui button">Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

// export default reduxForm({ form: 'signup' })(Signup);
export default compose(
  connect(mapStateToProps, {signup: signup}),
  reduxForm({ form: 'signup' })
)(Signup);