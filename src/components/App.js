import React, { Component } from 'react';
import '../css/App.css';
import * as data from '../utils/sampleData.json'
import SideBar from './SideBar'
import SideView from './SideView'

class App extends Component {

  state = {
    structure:data.default
  }
  addData = (itemPathAsKey, itemDataToAdd, currNavPath) => {
    this.setState(state => {
      console.log(itemPathAsKey, itemDataToAdd, currNavPath)
      console.log(state.structure)
      return {
        structure:{
          ...state.structure,
          [itemPathAsKey]: itemDataToAdd,
          [currNavPath]:{
            ...state.structure[currNavPath],
            children: [...state.structure[currNavPath].children, itemPathAsKey]
          } 
        }
      }
    })
  }
  render() {
    console.log(this.state.structure)
    return (
      <div className="main">
        <SideBar structure={this.state.structure}/>
        <SideView structure={this.state.structure} addData={this.addData}/>
      </div>
    );
  }
}

export default App;
