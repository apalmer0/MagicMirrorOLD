import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { filter, round, sum } from 'lodash';
import moment from 'moment';

import helpers from './helpers';
import Chart from '../Chart';

const UNITS = 'F';

class Weather extends Component {
  getPaddedArray = (arr) => {
    const emptyObject = {
      time: '',
      temp: 0,
    };
    const emptyData = [emptyObject, emptyObject, emptyObject, emptyObject, emptyObject, emptyObject, emptyObject];
    const forecastBucketCount = 8;
    const start = forecastBucketCount - arr.length;
    emptyData.splice(start, arr.length);

    return emptyData.concat(arr);
  }

  getAverage = (data) => {
    const temps = filter(data, val => val.temp > 0).map(val => val.temp);

    return round(sum(temps) / temps.length);
  }

  matchDayname = (utc, target) => {
    return moment.unix(utc).format('dddd') === target;
  }

  render () {
    const today = moment().format('dddd');
    const tomorrow = moment().add(1, 'day').format('dddd');
    const { kelvinToFarenheit } = helpers;

    const { weather } = this.props;

    if (!weather) return false;

    const tempsToday = filter(weather.list, (temp) => {
      return this.matchDayname(temp.dt, today);
    }).map((val) => {
      return ({
        temp: kelvinToFarenheit(val.main.temp),
        time: moment.unix(val.dt).local().format('ha'),
      });
    });
    const tempsTomorrow = filter(weather.list, (temp) => {
      return this.matchDayname(temp.dt, tomorrow);
    }).map((val) => {
      return ({
        temp: kelvinToFarenheit(val.main.temp),
        time: moment.unix(val.dt).local().format('ha'),
      });
    });

    return (
      <div>
        <h1>today (avg: {this.getAverage(tempsToday)}° {UNITS})</h1>
        <Chart data={this.getPaddedArray(tempsToday)} />
        <h1>tomorrow (avg: {this.getAverage(tempsTomorrow)}° {UNITS})</h1>
        <Chart data={tempsTomorrow} />
      </div>
    );
  }
}

Weather.propTypes = {
  weather: shape({
    list: arrayOf({
      main: shape({
        temp: string,
      }),
    }),
  }),
};

Weather.defaultProps = {
  weather: {},
};

const mapStateToProps = (state) => {
  const { weather } = state.app;

  return { weather };
};

export default connect(mapStateToProps)(Weather);
