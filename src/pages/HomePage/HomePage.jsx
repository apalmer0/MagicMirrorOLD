import React, { Component } from 'react';

import Clock from 'components/Clock';
import Greeting from 'components/Greeting';

class HomePage extends Component {
  render () {
    return (
      <div>
        <Clock />
        <Greeting />
      </div>
    );
  }
}

export default HomePage;
