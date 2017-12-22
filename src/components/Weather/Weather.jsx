import React, { Component } from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import ForecastItem from '../ForecastItem';

class Weather extends Component {
  render () {
    const { list } = this.props;

    if (!list || !list.length) return false;

    return (
      <div>
        {
          list.map((weatherData, index) => {
            const date = moment().add(index, 'days').format('dddd, MMM Do');

            return (
              <ForecastItem weatherData={weatherData} key={index} date={date} />
            );
          })
        }
      </div>
    );
  }
}

Weather.propTypes = {
  list: array,
};

const mapStateToProps = (state) => {
  const { list } = state.app;

  return { list };
};

export default connect(mapStateToProps)(Weather);
