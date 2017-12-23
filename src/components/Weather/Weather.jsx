import React, { Component } from 'react';
import { arrayOf, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import helpers from './helpers';
import Chart from '../Chart';

const UNITS = 'F';

class Weather extends Component {
  render () {
    const today = moment().format('dddd');
    const tomorrow = moment().add(1, 'day').format('dddd');
    const { weather } = this.props;
    const { getAverage, getTempObject, getPaddedArray } = helpers;

    if (!weather) return false;

    const tempsToday = getTempObject(weather, today);
    const tempsTomorrow = getTempObject(weather, tomorrow);

    return (
      <div>
        <h1>today (avg: {getAverage(tempsToday)}° {UNITS})</h1>
        <Chart data={getPaddedArray(tempsToday)} />
        <h1>tomorrow (avg: {getAverage(tempsTomorrow)}° {UNITS})</h1>
        <Chart data={tempsTomorrow} />
      </div>
    );
  }
}

Weather.propTypes = {
  weather: shape({
    list: arrayOf(
      shape({
        main: shape({
          temp: number,
        }),
      }),
    ),
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
