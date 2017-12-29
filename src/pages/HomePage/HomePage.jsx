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
const TODOIST = 'Todoist';
const WEATHER = 'Weather';

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
    storage.setItem(TODOIST, moment().format('dddd'));
    const { dispatch } = this.props;

    return dispatch(actions.fetchTodoItems('items'));
  }

  getWeather = () => {
    console.log('getWeather called');
    storage.setItem(WEATHER, moment().format('ha'));
    const { dispatch } = this.props;

    return dispatch(actions.fetchWeather());
  }

  refreshValues = () => {
    const lastTodoistUpdate = storage.getItem(TODOIST);
    const lastWeatherUpdate = storage.getItem(WEATHER);
    console.log('refreshValues');

    if (moment().format('dddd') !== lastTodoistUpdate) {
      this.getTodoList();
    }

    if (moment().format('ha') !== lastWeatherUpdate) {
      this.getWeather();
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
