import React, { Component } from 'react';
import moment from 'moment';
import { arrayOf, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import TodoListItem from '../TodoListItem';
import styles from './styles';

class TodoList extends Component {
  renderNoTasks = () => {
    const todayIsFriday = moment().format('dddd') === 'Friday';
    const noTasksFriday = <iframe title="Friday" src="https://giphy.com/embed/l1BgT6CDFMPU5Ibtu" width="480" height="260" frameBorder="0" className="giphy-embed" allowFullScreen />;
    const noTasks = <div>no items found</div>;

    return todayIsFriday ? noTasksFriday : noTasks;
  }

  render () {
    const { todoStyles } = styles;
    const { list } = this.props;

    if (!list.length) return false;

    const tasksToDo = filter(list, (item) => {
      const dueDate = moment(item.due_date_utc).local();
      const now = moment();
      const due = dueDate.diff(now, 'days') <= 0;

      return due;
    });

    return (
      <div style={todoStyles}>
        <h1>To do today:</h1>
        {
          tasksToDo.length
            ? tasksToDo.map(task => <TodoListItem key={task.id} content={task.content} />)
            : this.renderNoTasks()
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  list: arrayOf({
    content: string,
    due_date_utc: string,
    id: number,
  }),
};

TodoList.defaultProps = {
  list: [],
};

const mapStateToProps = (state) => {
  const list = state.app.todo;

  return { list };
};

export default connect(mapStateToProps)(TodoList);
