import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import styles from './styles';

class Trivia extends Component {
  render () {
    const {
      answerContainerStyles,
      categoryStyles,
      containerStyles,
      difficultyStyles,
      headerStyles,
      questionStyles,
    } = styles;
    const { triviaItems } = this.props;

    return (
      <div>
        {triviaItems.map((item) => {
          const {
            category,
            correct_answer: correctAnswer,
            difficulty,
            incorrect_answers: incorrectAnswers,
            question,
          } = item;

          return (
            <div key={question} style={containerStyles}>
              <div style={headerStyles}>
                <span style={categoryStyles}>{startCase(category)}</span>
                <span style={difficultyStyles}>({difficulty})</span>
              </div>
              <div style={questionStyles}>{question}</div>
              <div>
                <div style={answerContainerStyles}>
                  <div>{correctAnswer}</div>
                  {incorrectAnswers.map(answer => <div key={answer}>{answer}</div>)}
                </div>
              </div>
            </div>
          );
        })}
        <div>
          To play, say &quot;Hey Google - Answer: C&quot; or &quot;Hey Google - Answer: True&quot;
        </div>
        <div>
          Don&apos;t know the answer? Just guess, or say &quot;Hey Google - new question&quot;
        </div>
      </div>
    );
  }
}

Trivia.propTypes = {
  triviaItems: arrayOf(shape({
    category: string,
    correct_answer: string,
    difficulty: string,
    guess: string,
    incorrect_answers: arrayOf(string),
    question: string,
    status: string,
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
