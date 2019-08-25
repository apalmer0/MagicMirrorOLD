import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import styles from './styles';

const Stats = (props) => {
  const {
    containerStyles,
    statData,
    tableHeader,
    tableStyles,
  } = styles;
  const { triviaItems, triviaStats } = props;
  const { today, all_time: allTime } = triviaStats;
  const todayStats = Math.round(today * 100);
  const allTimeStats = Math.round(allTime * 100);

  if (triviaItems.length === 0) return false;

  const previousQuestion = triviaItems[1];
  const { max_streak: maxStreak, streak_count: streakCount } = triviaItems[0] || 0;
  const streakType = previousQuestion.status === 'incorrect' ? 'incorrect' : 'correct';

  return (
    <span style={containerStyles}>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={tableHeader}>Percent Correct</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Today:</td>
            <td style={statData}>{todayStats}%</td>
          </tr>
          <tr>
            <td>All Time:</td>
            <td style={statData}>{allTimeStats}%</td>
          </tr>
        </tbody>
      </table>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={tableHeader}>Streaks</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current:</td>
            <td style={statData}>{streakCount} {streakType}</td>
          </tr>
          <tr>
            <td>Record:</td>
            <td style={statData}>{maxStreak} correct</td>
          </tr>
        </tbody>
      </table>
    </span>
  );
};

Stats.propTypes = {
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

Stats.defaultProps = {
  triviaItems: [],
  triviaStats: {
    today: 0,
    all_time: 0,
  },
};

export default Stats;
