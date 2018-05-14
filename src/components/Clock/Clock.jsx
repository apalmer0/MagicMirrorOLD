import React, { Component } from 'react';
import moment from 'moment';

import styles from './styles';

class Clock extends Component {
  state = {
    day: moment().format('MMMM Do YYYY'),
    time: moment().format('h:mm a'),
  }

  componentWillMount () {
    const intervalId = setInterval(() => this.setTime(), 1000);

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setTime = () => {
    const day = moment().format('MMMM Do YYYY');
    const time = moment().format('h:mm a');

    this.setState({ day, time });
  }

  render () {
    const { day, time } = this.state;
    const { dayStyles, timeStyles } = styles;

    return (
      <div>
        <p style={dayStyles}>{day}</p>
        <p style={timeStyles}>{time}</p>
      </div>
    );
  }
}

export default Clock;
