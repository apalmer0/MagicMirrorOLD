import { filter, round, sum } from 'lodash';
import moment from 'moment';

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

  if (temps.length === 0) return '-';

  return round(sum(temps) / temps.length);
};

const matchDayname = (unix, target) => {
  return moment.unix(unix).format('dddd') === target &&
    moment.unix(unix).isAfter(moment().subtract(2, 'hours'));
};

const convertUnix = time => (
  moment.unix(time).local().format('ha')
);

const getTempObject = (weather, day) => {
  return filter(weather, ({ unix_time: unixTime }) => {
    return matchDayname(unixTime, day);
  }).map((matchingTempObject) => {
    const {
      precip_chance: precipChance,
      temperature,
      unix_time: unixTime,
    } = matchingTempObject;

    return ({
      temp: temperature,
      precip: precipChance,
      time: convertUnix(unixTime),
    });
  });
};

export default {
  getAverage,
  getPaddedArray,
  getTempObject,
  matchDayname,
};
