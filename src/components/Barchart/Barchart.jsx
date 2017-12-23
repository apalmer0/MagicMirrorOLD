import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Barchart extends Component {
  static propTypes = {
    barWidth: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.number),
    labels: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.number,
    margin: PropTypes.number,
    points: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.object,
  };

  static defaultProps = {
    style: { fill: 'slategray' },
  };

  render() {
    const { data, points, height, style, barWidth, margin, labels } = this.props;
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

          return (
            <g key={point.x}>
              {
                data[index] > 0 &&
                  <rect
                    x={point.x}
                    y={-height - 5}
                    width={width}
                    height={Math.max(0, height - point.y)}
                    style={style}
                  />
              }
              <text {...dataProps}>
                {data[index] > 0 ? `${data[index]}°` : '' }
              </text>
              <text {...timeProps}>{labels[index]}</text>
            </g>
          );
        })}
      </g>
    );
  }
}
