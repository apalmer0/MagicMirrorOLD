import React, { Component } from 'react';
import moment from 'moment';

import styles from './styles';

class Clock extends Component {
  state = {
    date: moment().format('MMMM Do YYYY'),
    day: moment().format('dddd'),
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
    const date = moment().format('MMMM Do YYYY');
    const day = moment().format('dddd');
    const time = moment().format('h:mm a');

    this.setState({ date, day, time });
  }

  render () {
    const { date, day, time } = this.state;
    const { dateStyles, dayStyles, timeStyles } = styles;

    return (
      <div>
        <p style={dayStyles}>{day}</p>
        <p style={dateStyles}>{date}</p>
        <p style={timeStyles}>{time}</p>
      </div>
    );
  }
}

export default Clock;
