import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import TodoList from 'components/TodoList';
import Weather from 'components/Weather';
import styles from './styles';

const THREE_HOURS = 1000 * 60 * 60 * 3;
const ONE_DAY = 1000 * 60 * 60 * 24;

class HomePage extends Component {
  componentWillMount () {
    this.getTodoList();
    this.getWeather();
  }

  componentDidMount () {
    window.setInterval(() => this.getWeather(), THREE_HOURS);
    window.setInterval(() => this.getTodoList(), ONE_DAY);
  }

  getTodoList = () => {
    console.log('getTodoList called');
    const { dispatch } = this.props;

    return dispatch(actions.fetchTodoItems('items'));
  }

  getWeather = () => {
    console.log('getWeather called');
    const { dispatch } = this.props;

    return dispatch(actions.fetchWeather());
  }

  render () {
    const { halfPage } = styles;

    return (
      <div>
        <Row>
          <Col md={6} style={halfPage}>
            <Clock />
          </Col>
          <Col md={6} style={halfPage}>
            <TodoList />
          </Col>
        </Row>
        <Weather />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(HomePage);
