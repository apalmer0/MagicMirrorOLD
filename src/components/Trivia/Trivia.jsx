import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import Stats from '../Stats';
import styles from './styles';
import TriviaTips from '../TriviaTips';

class Trivia extends Component {
  multipleChoice = (item) => {
    const {
      correct_letter: correctLetter,
      guess,
      options,
      status,
    } = item;
    const letters = Object.keys(options);
    const { answerContainerStyles, correctStyle, guessStyle } = styles;
    const answered = status !== 'unanswered';

    return (
      letters.map((letter) => {
        const guessed = guess && guess.toUpperCase() === letter;
        const correct = answered && correctLetter && correctLetter.toUpperCase() === letter;
        const style = {
          ...answerContainerStyles,
          ...guessed ? guessStyle : {},
          ...correct ? correctStyle : {},
        };

        return (
          <div style={style} key={letter}>
            <span>{letter}: </span>
            <span>{options[letter]}</span>
          </div>
        );
      })
    );
  }

  trueFalse = (item) => {
    const {
      correct_answer: correctAnswer,
      guess,
      incorrect_answers: incorrectAnswers,
      status,
    } = item;
    const answerOptions = [
      ...incorrectAnswers,
      correctAnswer,
    ];
    const answered = status !== 'unanswered';
    const { answerContainerStyles, correctStyle, guessStyle } = styles;

    return (
      answerOptions.map((answerOption) => {
        const guessed = startCase(guess) === answerOption;
        const correct = answered && startCase(answerOption) === correctAnswer;
        const style = {
          ...answerContainerStyles,
          ...guessed ? guessStyle : {},
          ...correct ? correctStyle : {},
        };

        return (
          <div style={style} key={answerOption}>{answerOption}</div>
        );
      })
    );
  }

  render () {
    const {
      categoryStyles,
      containerStyles,
      difficultyStyles,
      greenStyle,
      headerStyles,
      questionStyles,
      redStyle,
      statusStyles,
    } = styles;
    const { triviaItems, triviaStats } = this.props;

    return (
      <div>
        <TriviaTips />
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
          const statusStyle = {
            ...statusStyles,
            ...(status === 'correct') ? greenStyle : {},
            ...(status === 'incorrect') ? redStyle : {},
          };

          return (
            <div key={question} style={containerStyles}>
              <div style={headerStyles}>
                <span style={categoryStyles}>{startCase(category)}</span>
                {status !== 'unanswered' && (
                  <span style={statusStyle}>{startCase(status)}!</span>
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
        <Stats triviaItems={triviaItems} triviaStats={triviaStats} />
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
  triviaStats: shape({
    today: number,
    all_time: number,
  }),
};

Trivia.defaultProps = {
  triviaItems: [],
  triviaStats: {
    today: 0,
    all_time: 0,
  },
};

const mapStateToProps = (state) => {
  const { triviaItems, triviaStats } = state.app;

  return { triviaItems, triviaStats };
};

export default connect(mapStateToProps)(Trivia);
