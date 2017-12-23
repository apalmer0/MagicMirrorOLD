import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {
  state = {
    day: moment().format('MMMM Do YYYY'),
    time: moment().format('h:mm a'),
  }

  setTime = () => {
    const day = moment().format('MMMM Do YYYY');
    const time = moment().format('h:mm a');

    this.setState({ day, time })
  }

  componentWillMount () {
    this.setTime()
  }

  componentDidMount () {
    window.setInterval(() => {
      this.setTime();
    }, 1000);
  }

  render () {
    const { day, time } = this.state;

    return (
      <div>
        <p>{day}</p>
        <h1>{time}</h1>
      </div>
    )
  }
}

export default Clock;
