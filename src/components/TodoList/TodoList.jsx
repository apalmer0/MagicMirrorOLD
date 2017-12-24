import React, { Component } from 'react';

import TodoListItem from '../TodoListItem';
import styles from './styles';

class TodoList extends Component {
  render () {
    const list = [
      {
        id: 1,
        content: 'walk the dog',
        project: 'personal',
      },
      {
        id: 2,
        content: 'pay the bills',
        project: 'personal',
      },
      {
        id: 3,
        content: 'feed the hog',
        project: 'personal',
      },
      {
        id: 4,
        content: 'paint the house',
        project: 'personal',
      },
      {
        id: 5,
        content: 'do some homework',
        project: 'personal',
      },
    ];
    const { todoStyles } = styles;

    return (
      <div style={todoStyles}>
        <h1>To do today:</h1>
        {
          list.map(item => <TodoListItem key={item.id} content={item.content} />)
        }
      </div>
    );
  }
}

export default TodoList;
