import React, { Component } from "react";
// styles
import "../css/App.css";
// components
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Explorer from "./Explorer";
// constants
import { initialPath } from "../utils/constants";
// utils
import * as data from "../utils/sampleData.json";

class App extends Component {
  state = {
    structure: data.default,
    currNavPath: initialPath,
    showRightContext: false,
    pagex: 0,
    pagey: 0,
    showModal: "",
    searchValue: "",
    currRightContextFolder: ""
  };

  showRightContextMenu = (path, pagex, pagey) => {
    this.setState({
      pagex: pagex,
      pagey: pagey,
      showRightContext: true,
      currRightContextFolder: path
    });
  };

  closeRightContextMenu = () => {
    this.setState({ showRightContext: false });
  };

  static deleteRecursively = (path, currPath, structure) => {
    if (structure[path].children.length === 0) {
      structure[currPath].children = structure[currPath].children.filter(
        curr => curr !== path
      );
      delete structure[path];
      return structure;
    }
    structure[path].children.forEach(child => {
      App.deleteRecursively(child, path, structure);
    });
    return App.deleteRecursively(path, currPath, structure);
  };

  updatePath = path => {
    this.setState({
      currNavPath: path,
      searchValue: ""
    });
  };

  addData = (itemPathAsKey, itemDataToAdd, currNavPath) => {
    if (
      !(
        this.state.structure[itemPathAsKey] &&
        this.state.structure[itemPathAsKey].type === itemDataToAdd.type
      )
    ) {
      this.setState(state => {
        return {
          structure: {
            ...state.structure,
            [itemPathAsKey]: itemDataToAdd,
            [currNavPath]: {
              ...state.structure[currNavPath],
              children: [
                ...state.structure[currNavPath].children,
                itemPathAsKey
              ]
            }
          }
        };
      });
    }
  };

  deleteDataRecursively = path => {
    this.setState(state => {
      const newObj = Object.assign({}, state.structure);
      return App.deleteRecursively(path, state.currNavPath, newObj);
    });
  };

  handleClick = evt => {
    if (this.state.showRightContext) {
      this.closeRightContextMenu();
    }
    if (this.state.showModal !== "") {
      this.setModalState("");
    }
  };

  setModalState = setModalState => {
    this.setState({ showModal: setModalState });
  };

  closeAddModal = () => {
    this.setState({ showModal: "" });
  };

  setSearchValue = searchData => {
    this.setState({ searchValue: searchData });
  };

  render() {
    return (
      <div className="main" onClick={this.handleClick}>
        <SideBar
          structure={this.state.structure}
          updatePath={this.updatePath}
        />
        <div className="sideview-container">
          <NavBar
            currNavPath={this.state.currNavPath}
            updatePath={this.updatePath}
            setSearchValue={this.setSearchValue}
            searchValue={this.state.searchValue}
          />
          <Explorer
            structure={this.state.structure}
            currNavPath={this.state.currNavPath}
            updatePath={this.updatePath}
            addData={this.addData}
            deleteData={this.deleteDataRecursively}
            showRightContextMenu={this.showRightContextMenu}
            closeRightContextMenu={this.closeRightContextMenu}
            pagex={this.state.pagex}
            pagey={this.state.pagey}
            showRightContext={this.state.showRightContext}
            setModalState={this.setModalState}
            showModal={this.state.showModal}
            closeAddModal={this.closeAddModal}
            searchValue={this.state.searchValue}
            pathOfClicked={this.state.currRightContextFolder}
          />
        </div>
      </div>
    );
  }
}

export default App;
