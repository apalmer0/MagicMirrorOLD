import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import actions from 'redux/nodes/app/actions';
import Clock from 'components/Clock';
import Greeting from 'components/Greeting';
import Weather from 'components/Weather';

class HomePage extends Component {
  componentWillMount () {
    const { dispatch } = this.props;

    return dispatch(actions.fetchWeather());
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
  dispatch: func.isRequired,
};

export default connect()(HomePage);
