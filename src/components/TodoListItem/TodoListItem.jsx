import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { string } from 'prop-types';

import styles from './styles';

class TodoListItem extends Component {
  render () {
    const { content } = this.props;
    const { listBullet, listContent, todoItem } = styles;

    return (
      <Row style={todoItem}>
        <Col md={1} style={listBullet}>
          ◦
        </Col>
        <Col md={11} style={listContent}>
          {content}
        </Col>
      </Row>
    );
  }
}

TodoListItem.propTypes = {
  content: string.isRequired,
};

export default TodoListItem;
