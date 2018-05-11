import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import Images from 'components/Images';
import TodoList from 'components/TodoList';
import Weather from 'components/Weather';
import styles from './styles';

const ONE_HOUR = 1000 * 60 * 60 * 1;
const FIVE_SECONDS = 5000;

class HomePage extends Component {
  componentWillMount () {
    this.getImages();
    this.getTodoList();
    this.getWeather();
  }

  componentDidMount () {
    global.window.setInterval(() => this.getImages(), FIVE_SECONDS);
    global.window.setInterval(() => this.getTodoList(), FIVE_SECONDS);
    global.window.setInterval(() => this.getWeather(), ONE_HOUR);
  }

  getImages = () => {
    const { dispatch } = this.props;

    return dispatch(actions.fetchImages());
  }

  getTodoList = () => {
    const { dispatch } = this.props;

    return dispatch(actions.fetchTodoItems());
  }

  getWeather = () => {
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
        <Images />
        <Weather />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(HomePage);
