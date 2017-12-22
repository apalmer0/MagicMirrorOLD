import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func } from 'prop-types';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import Greeting from 'components/Greeting';
import Weather from 'components/Weather';

class HomePage extends Component {
  componentWillMount () {
    this.props.fetchWeather();
  }

  render () {
    return (
      <div>
        <Clock />
        <Greeting />
        <Weather />
      </div>
    );
  }
}

HomePage.propTypes = {
  fetchWeather: func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const fetchWeather = actions.fetchWeather;

  return bindActionCreators({ fetchWeather }, dispatch);
};

export default connect(null, mapDispatchToProps)(HomePage);
