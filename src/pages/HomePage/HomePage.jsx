import React, { Component } from 'react';
import { arrayOf, number, shape, string, func } from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import GoogleImages from 'components/GoogleImages';
import Images from 'components/Images';
import TodoList from 'components/TodoList';
import Weather from 'components/Weather';
import styles from './styles';

const ONE_HOUR = 1000 * 60 * 60 * 1;
const FIVE_SECONDS = 5000;

class HomePage extends Component {
  componentWillMount () {
    this.getGoogleImages();
    this.getTodoList();
    this.getTwilioImages();
    this.getWeather();
  }

  componentDidMount () {
    global.window.setInterval(() => this.getGoogleImages(), FIVE_SECONDS);
    global.window.setInterval(() => this.getTodoList(), FIVE_SECONDS);
    global.window.setInterval(() => this.getTwilioImages(), FIVE_SECONDS);
    global.window.setInterval(() => this.getWeather(), ONE_HOUR);
  }

  getGoogleImages = () => (
    this.props.dispatch(actions.fetchGoogleImages())
  )

  getTodoList = () => (
    this.props.dispatch(actions.fetchTodoItems())
  )

  getTwilioImages = () => (
    this.props.dispatch(actions.fetchTwilioImages())
  )

  getWeather = () => (
    this.props.dispatch(actions.fetchWeather())
  )

  homepageContent = () => {
    const { halfPage, homepageContainer } = styles;

    return (
      <div style={homepageContainer}>
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
  };

  render () {
    const { googleImages } = this.props;
    const { homepageContent } = this;

    return (
      <div>
        { googleImages.length > 0 ? <GoogleImages /> : homepageContent() }
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: func.isRequired,
  googleImages: arrayOf(shape({
    caption: string,
    created_at: string,
    from_number: string,
    id: number,
    query: string,
    updated_at: string,
    url: string,
  })),
};

HomePage.defaultProps = {
  googleImages: [],
};

const mapStateToProps = (state) => {
  const { googleImages } = state.app;

  return { googleImages };
};

export default connect(mapStateToProps)(HomePage);
