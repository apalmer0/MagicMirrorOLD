import _ from 'lodash';

const dataToPoints = (props) => {
  const { data, width = 1, height = 1, margin = 0 } = props;
  const max = _.max(data);
  const min = _.min(data);
  const count = data.length;

  const barWidth = (width - (margin * (count + 1))) / count;
  const barHeight = (height - margin * 2) / ((max - min) || 2);

  return data.map((d, i) => ({
    x: (i * barWidth) + ((i + 1) * margin),
    y: (max === min ? 1 : (max - d)) * barHeight + margin,
  }));
};

export default {
  dataToPoints,
};
