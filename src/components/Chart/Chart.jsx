import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import SparklinesClone from '../SparklinesClone';
import Barchart from '../Barchart';

const WHITE = '#ffffff';

class Chart extends Component {
  render () {
    // const { data } = this.props;
    const data = [
      {
        precip: 10,
        temp: 30,
        time: 'foo',
      },
      {
        precip: 10,
        temp: 40,
        time: 'foo',
      },
      {
        precip: 10,
        temp: 10,
        time: 'foo',
      },
      {
        precip: 10,
        temp: 10,
        time: 'foo',
      },
      {
        precip: 10,
        temp: 10,
        time: 'foo',
      },
      {
        precip: 10,
        temp: 10,
        time: 'foo',
      },
      {
        precip: 10,
        temp: 30,
        time: 'foo',
      },
    ];
    const whiteBars = { fill: WHITE };

    if (!data) return false;

    return (
      <div>
        <SparklinesClone height={25} width={180} dataObjects={data}>
          <Barchart style={whiteBars} />
        </SparklinesClone>
      </div>
    );
  }
}

Chart.propTypes = {
  data: arrayOf(shape({
    precip: number,
    temp: number,
    time: string,
  })).isRequired,
};

export default Chart;
