import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { signin } from '../../actions';

class Signin extends React.Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push('/portfolio');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>      
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" autoComplete="off" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password"  component="input" autoComplete="off" />
        </fieldset>
        <div>
          {this.props.errorMessage}
        </div>
        <button>Sign In</button>
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
  connect(mapStateToProps, {signin: signin}),
  reduxForm({ form: 'signin' })
)(Signin);