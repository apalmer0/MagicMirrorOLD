import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import styles from './styles';

class Trivia extends Component {
  render () {
    const {
      answerContainerStyles,
      categoryStyles,
      containerStyles,
      headerStyles,
      questionStyles,
      statusStyles,
      valueStyles,
    } = styles;
    const { triviaItems } = this.props;

    return (
      <div>
        {triviaItems.map((item) => {
          const {
            answer,
            category,
            guess,
            question,
            status,
            value,
          } = item;

          return (
            <div key={question} style={containerStyles}>
              <div style={headerStyles}>
                <span style={categoryStyles}>{startCase(category)}</span>
                <span style={valueStyles}>${value}</span>
              </div>
              <div style={questionStyles}>{question}</div>
              {status !== 'unanswered' && (
                <div>
                  <div style={answerContainerStyles}>
                    <span style={statusStyles}>{startCase(status)}: </span>
                    <span>{guess}</span>
                  </div>
                  <div style={answerContainerStyles}>
                    <span style={statusStyles}>Correct answer: </span>
                    <span>{answer}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

Trivia.propTypes = {
  triviaItems: arrayOf(shape({
    answer: string,
    category: string,
    guess: string,
    question: string,
    status: string,
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
