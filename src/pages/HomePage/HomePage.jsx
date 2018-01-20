import React, { Component } from 'react';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import storage from 'storage';
import TodoList from 'components/TodoList';
import Weather from 'components/Weather';
import styles from './styles';

const ONE_HOUR = 1000 * 60 * 60 * 1;
const LAST_UPDATE = 'Last Update';
const TIME_FORMAT = 'ha';

class HomePage extends Component {
  componentWillMount () {
    this.getTodoList();
    this.getWeather();
  }

  componentDidMount () {
    global.window.setInterval(() => this.refreshValues(), ONE_HOUR);
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

  refreshValues = () => {
    const lastUpdate = storage.getItem(LAST_UPDATE);
    console.log('refreshValues');

    if (moment().format(TIME_FORMAT) !== lastUpdate) {
      storage.setItem(LAST_UPDATE, moment().format(TIME_FORMAT));
      this.getWeather();
      this.getTodoList();
    }
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
