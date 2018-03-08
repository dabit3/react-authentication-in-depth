import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header'
import Authenticator from './Authenticator'
import Router from './Router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
