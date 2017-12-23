import React, { Component } from 'react';

import styles from './styles';
import { getGreetings } from './helpers';

class Greeting extends Component {
  getGreeting = () => {
    const allGreetings = getGreetings();
    const count = allGreetings.length;
    const index = Math.floor((Math.random() * count));

    return allGreetings[index];
  }

  render () {
    const { greetingStyles } = styles;
    const greeting = this.getGreeting();

    return (
      <div style={greetingStyles}>
        <p>{greeting}</p>
      </div>
    );
  }
}

export default Greeting;
