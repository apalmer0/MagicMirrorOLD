import React, { PureComponent } from 'react';
import {
  arrayOf,
  node,
  number,
  shape,
  string,
} from 'prop-types';

import helpers from './helpers';

class SparklinesClone extends PureComponent {
  render() {
    const {
      children,
      dataObjects,
      height,
      limit,
      margin,
      max,
      min,
      preserveAspectRatio,
      style,
      svgHeight,
      svgWidth,
      width,
    } = this.props;
    const data = dataObjects.map((val) => {
      const { temp, precip } = val;

      return { temp, precip };
    });

    const labels = dataObjects.map(val => val.time);

    if (dataObjects.length === 0) return null;

    const points = helpers.dataToPoints({
      data,
      height,
      limit,
      margin,
      max,
      min,
      width,
    });
    const viewBox = `0 0 ${width} ${height + 10}`;
    const svgOpts = { style, viewBox, preserveAspectRatio };

    if (svgWidth > 0) svgOpts.width = svgWidth;
    if (svgHeight > 0) svgOpts.height = svgHeight;

    return (
      <svg {...svgOpts}>
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              data,
              height,
              labels,
              margin,
              points,
              width,
            });
          })
        }
      </svg>
    );
  }
}

SparklinesClone.propTypes = {
  children: node.isRequired,
  dataObjects: arrayOf(shape({
    precip: number,
    temp: number,
    time: string,
  })),
  height: number,
  labels: arrayOf(string),
  limit: number,
  margin: number,
  max: number,
  min: number,
  preserveAspectRatio: string,
  style: shape({
    fill: string,
  }),
  svgHeight: number,
  svgWidth: number,
  width: number,
};

SparklinesClone.defaultProps = {
  dataObjects: [],
  height: 60,
  labels: [],
  limit: 0,
  margin: 2,
  max: 0,
  min: 0,
  // Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
  preserveAspectRatio: 'none', // https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
  svgHeight: 0,
  svgWidth: 0,
  style: {},
  width: 240,
};

export default SparklinesClone;
