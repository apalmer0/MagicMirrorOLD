import React, { Component } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';

import styles from './styles';
import helpers from './helpers';

export default class ForecastItem extends Component {
  render () {
    const { internal, external } = styles;
    const { kelvinToFarenheit } = helpers;
    const { weatherData, date } = this.props;
    const { temp, weather } = weatherData;
    const { max, min } = temp;
    const { description, icon } = weather[0];
    const imgSrc = `http://openweathermap.org/img/w/${icon}.png`;

    return (
      <div style={external}>
        <p>{date}</p>
        <div style={internal}>
          <img src={imgSrc} alt={description} />
          <h4>{kelvinToFarenheit(min)}° - {kelvinToFarenheit(max)}°</h4>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

ForecastItem.propTypes = {
  date: string.isRequired,
  weatherData: shape({
    temp: shape({
      max: number,
      min: number,
    }),
    weather: arrayOf(
      shape({
        description: string,
        icon: string,
      }),
    ),
  }).isRequired,
};
