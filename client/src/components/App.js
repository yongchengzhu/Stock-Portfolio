import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signup from './auth/Signup';
import Portfolio from './stock/Portfolio';
import Transactions from './stock/Transactions';
import Signout from './auth/Signout';
import Signin from './auth/Signin';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/signin" component={Signin} exact />
          <Route path="/signout" component={Signout} exact />
          <Route path="/portfolio" component={Portfolio} exact />
          <Route path="/transactions" component={Transactions} exact />
        </div>
      </BrowserRouter>
    );
  }
};

export default App;