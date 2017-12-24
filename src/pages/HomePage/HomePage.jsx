import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import TodoList from 'components/TodoList';
import Weather from 'components/Weather';
import styles from './styles';

class HomePage extends Component {
  componentWillMount () {
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
