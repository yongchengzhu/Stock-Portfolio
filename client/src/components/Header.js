import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import '../styles/Header.css';

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="right menu">
          <Link className="item" to="/portfolio">Portfolio</Link>
          <Link className="item" to="/transactions">Transactions</Link>
          <Link className="item" to="/signout">Sign Out</Link>
        </div>
      );
    } else {
      return (
        <div className="right menu">
          <Link className="item" to="/signup">Sign Up</Link>
          <Link className="item" to="/signin">Sign In</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui menu header">
        <Link className="item" to="/">Home</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, {})(Header);