import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import helpers from './helpers';

class SparklinesClone extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    dataObjects: PropTypes.array,
    labels: PropTypes.array,
    limit: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    svgWidth: PropTypes.number,
    svgHeight: PropTypes.number,
    preserveAspectRatio: PropTypes.string,
    margin: PropTypes.number,
    style: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
  };

  static defaultProps = {
    dataObjects: [],
    labels: [],
    width: 240,
    height: 60,
    // Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
    preserveAspectRatio: 'none', // https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
    margin: 2,
  };

  render() {
    const { children, dataObjects, limit, width, height, svgWidth, svgHeight, preserveAspectRatio, margin, style, max, min } = this.props;
    const data = dataObjects.map(val => val.temp);
    const labels = dataObjects.map(val => val.time);

    if (dataObjects.length === 0) return null;

    const points = helpers.dataToPoints({ data, limit, width, height, margin, max, min });
    const viewBox = `0 0 ${width} ${height + 10}`;
    const svgOpts = { style, viewBox, preserveAspectRatio };

    if (svgWidth > 0) svgOpts.width = svgWidth;
    if (svgHeight > 0) svgOpts.height = svgHeight;

    return (
      <svg {...svgOpts}>
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, { data, points, width, height, margin, labels });
          })
        }
      </svg>
    );
  }
}

export default SparklinesClone;
