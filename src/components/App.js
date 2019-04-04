import React, { Component } from 'react';
import '../css/App.css';
import * as data from '../utils/sampleData.json'
import SideBar from './SideBar'
import NavBar from './NavBar'

class App extends Component {

  state = {
    structure:data.default
  }
  render() {
    return (
      <div className="main">
        <SideBar/>
        <NavBar/>
      </div>
    );
  }
}

export default App;
