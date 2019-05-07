import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import styles from './styles';

class Trivia extends Component {
  multipleChoice = (item) => {
    const { options } = item;
    const letters = Object.keys(options);
    const { answerContainerStyles } = styles;

    return (
      letters.map(letter => (
        <div style={answerContainerStyles} key={letter}>
          <span>{letter}: </span>
          <span>{options[letter]}</span>
        </div>
      ))
    );
  }

  trueFalse = (item) => {
    const { answerContainerStyles } = styles;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = item;
    const answers = [
      ...incorrectAnswers,
      correctAnswer,
    ];

    return (
      answers.map(answer => (
        <div style={answerContainerStyles} key={answer}>{answer}</div>
      ))
    );
  }
  render () {
    const {
      categoryStyles,
      containerStyles,
      difficultyStyles,
      headerStyles,
      questionStyles,
      statusStyles,
    } = styles;
    const { triviaItems } = this.props;

    return (
      <div>
        {triviaItems.map((item) => {
          const {
            category,
            difficulty,
            question_type: questionType,
            question,
            status,
          } = item;
          const trueFalse = questionType === 'boolean';
          const multipleChoice = questionType === 'multiple';

          return (
            <div key={question} style={containerStyles}>
              <div style={headerStyles}>
                <span style={categoryStyles}>{startCase(category)}</span>
                {status !== 'unanswered' && (
                  <span style={statusStyles}>{startCase(status)}!</span>
                )}
              </div>
              <div>
                <span style={questionStyles}>{question}</span>
                <span style={difficultyStyles}>({difficulty})</span>
              </div>
              <div>
                {trueFalse && this.trueFalse(item)}
                {multipleChoice && this.multipleChoice(item)}
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
