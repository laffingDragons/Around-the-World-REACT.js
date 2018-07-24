import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <h1 className="App-title">Around the </h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      
    );
  }
}

export default Header;
