import './styles.css';
// import './t3-model';

import React from 'react';

class App extends React.Component {
  componentDidMount() {
    if (window) {
      require('./t3-model');
    }
  }
  render() {
    return null;
  }
}

export default App;
