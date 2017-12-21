import React, { Component } from 'react';
import { node } from 'prop-types';

class App extends Component {
  render () {
    const { children } = this.props;

    return (
      <div className="app">
        {children}
      </div>
    );
  }
}

App.defaultProps = {
  children: <div />,
};

App.propTypes = {
  children: node,
};

export default App;
