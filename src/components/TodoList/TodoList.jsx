import React, { Component } from 'react';
import moment from 'moment';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';

import TodoListItem from '../TodoListItem';
import styles from './styles';

class TodoList extends Component {
  renderNoTasks = () => {
    const todayIsFriday = moment().format('dddd') === 'Friday';
    const noTasksFriday = (
      <iframe
        allowFullScreen
        className="giphy-embed"
        frameBorder="0"
        height="260"
        src="https://giphy.com/embed/l1BgT6CDFMPU5Ibtu"
        title="Friday"
        width="480"
      />);
    const noTasks = <div>no items found</div>;

    return todayIsFriday ? noTasksFriday : noTasks;
  }

  render () {
    const { todoStyles } = styles;
    const { list } = this.props;

    return (
      <div style={todoStyles}>
        <h1>To do today:</h1>
        {
          list.length
            ? list.map(task => <TodoListItem key={task.id} content={task.content} />)
            : this.renderNoTasks()
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  list: arrayOf(shape({
    content: string,
    due: string,
    id: number,
  })),
};

TodoList.defaultProps = {
  list: [],
};

const mapStateToProps = (state) => {
  const list = state.app.todo;

  return { list };
};

export default connect(mapStateToProps)(TodoList);
