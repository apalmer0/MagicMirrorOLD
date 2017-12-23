import React, { Component } from 'react';
import moment from 'moment';

import styles from './styles';

class Clock extends Component {
  state = {
    day: moment().format('MMMM Do YYYY'),
    time: moment().format('h:mm a'),
  }

  componentWillMount () {
    this.setTime();
  }

  componentDidMount () {
    window.setInterval(() => {
      this.setTime();
    }, 1000);
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
