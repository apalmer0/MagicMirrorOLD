import { filter, round, sum } from 'lodash';
import moment from 'moment';

const kelvinToFarenheit = (kelvin) => {
  const constant = 459.67;
  const multiplier = kelvin * (9 / 5);

  return Math.floor(multiplier - constant);
};

const getPaddedArray = (arr) => {
  const emptyObject = {
    time: '',
    temp: 0,
  };
  const emptyData = new Array(8).fill(emptyObject);
  const forecastBucketCount = 8;
  const start = forecastBucketCount - arr.length;
  emptyData.splice(start, arr.length);

  return emptyData.concat(arr);
};

const getAverage = (data) => {
  const temps = filter(data, val => val.temp > 0).map(val => val.temp);

  return round(sum(temps) / temps.length);
};

const matchDayname = (utc, target) => {
  return moment.unix(utc).format('dddd') === target;
};

const getTempObject = (weather, day) => {
  return filter(weather.list, (temp) => {
    return matchDayname(temp.dt, day);
  }).map((val) => {
    return ({
      temp: kelvinToFarenheit(val.main.temp),
      time: moment.unix(val.dt).local().format('ha'),
    });
  });
};


export default {
  getAverage,
  getPaddedArray,
  getTempObject,
  kelvinToFarenheit,
  matchDayname,
};
