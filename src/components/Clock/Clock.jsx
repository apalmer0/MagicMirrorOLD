import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {
  state = {
    time: moment().format('h:mm a'),
  }

  setTime = () => {
    const time = moment().format('h:mm a')

    this.setState({ time })
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
    const { time } = this.state;

    return <h1>{time}</h1>
  }
}

export default Clock;
