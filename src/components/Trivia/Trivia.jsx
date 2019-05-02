import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import styles from './styles';

class Trivia extends Component {
  render () {
    const {
      categoryStyles,
      headerStyles,
      questionStyles,
      valueStyles,
    } = styles;
    const { triviaItems } = this.props;

    return (
      <div>
        {triviaItems.map((item) => {
          const { category, question, value } = item;
          return (
            <div key={question}>
              <div style={headerStyles}>
                <span style={categoryStyles}>{startCase(category)}</span>
                <span style={valueStyles}>${value}</span>
              </div>
              <div style={questionStyles}>{question}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

Trivia.propTypes = {
  triviaItems: arrayOf(shape({
    category: string,
    question: string,
    value: number,
  })),
};

Trivia.defaultProps = {
  triviaItems: [],
};

const mapStateToProps = (state) => {
  const { triviaItems } = state.app;

  return { triviaItems };
};

export default connect(mapStateToProps)(Trivia);
