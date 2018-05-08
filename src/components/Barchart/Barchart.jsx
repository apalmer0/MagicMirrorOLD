import React, { Component } from 'react';
import {
  arrayOf,
  number,
  object,
  shape,
  string,
} from 'prop-types';

export default class Barchart extends Component {
  render() {
    const {
      barWidth,
      data,
      height,
      labels,
      margin,
      points,
      style,
    } = this.props;
    const strokeWidth = 1 * ((style && style.strokeWidth) || 0);
    const marginWidth = margin ? 2 * margin : 0;
    const width =
      barWidth ||
      (points && points.length >= 2
        ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth)
        : 0);
    const FONTSIZE = '3';

    return (
      <g transform="scale(1,-1)">
        {points.map((point, index) => {
          const textProps = {
            fontSize: FONTSIZE,
            style,
            transform: 'scale(1,-1)',
            x: point.x,
          };
          const timeProps = {
            ...textProps,
            y: height + 8,
          };
          const dataProps = {
            ...textProps,
            y: point.y + Number(FONTSIZE),
          };
          const { temp, precip } = data[index];

          return (
            <g key={point.x}>
              {
                temp > 0 &&
                  <rect
                    x={point.x}
                    y={-height - 5}
                    width={width}
                    height={Math.max(0, height - point.y)}
                    style={style}
                  />
              }
              <text {...dataProps}>
                {temp > 0 ? `${temp}° - ${precip}%` : '' }
              </text>
              <text {...timeProps}>{labels[index]}</text>
            </g>
          );
        })}
      </g>
    );
  }
}

Barchart.propTypes = {
  barWidth: number,
  data: arrayOf(shape({
    temp: number,
    precip: number,
  })),
  labels: arrayOf(string),
  height: number,
  margin: number,
  points: arrayOf(object),
  style: shape({
    fill: string,
  }),
};

Barchart.defaultProps = {
  barWidth: 0,
  data: [{}],
  height: 0,
  labels: [],
  margin: 0,
  points: [],
  style: { fill: 'slategray' },
};
