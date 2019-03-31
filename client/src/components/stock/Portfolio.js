import React from 'react';

import requireAuth from '../requireAuth';

class Portfolio extends React.Component {
  render() {
    return <div>Portfolio Page</div>
  }
}

export default requireAuth(Portfolio);