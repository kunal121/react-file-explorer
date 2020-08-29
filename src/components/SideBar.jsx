import React, { Component } from "react";
// styles
import "../css/App.css";
// utils
import { downButton } from "../utils/constants";

const SideElement = props => {
  const isFolder = props.root.type === "folder";
  const hasChildren = props.root.children.length > 0;
  const isOpened = props.openFolders.includes(props.root.path);
  return isFolder ? (
    <div className="sidebar-element">
      <div
        className="element-container"
        onClick={evt => {
          props.handleClickSideElement(props.root.path);
        }}
      >
        <span className="sidebar-name">{props.root.name} </span>
        {hasChildren &&
          (isOpened ? (
            <img
              className="side-button"
              src={downButton}
              alt="upButton"
              onClick={evt => {
                evt.stopPropagation();
                props.closeFolder(props.root.path);
              }}
            />
          ) : (
            <img
              className="side-button make-down"
              src={downButton}
              alt="downButton"
              onClick={evt => {
                evt.stopPropagation();
                props.openFolder(props.root.path);
              }}
            />
          ))}
      </div>
      {hasChildren &&
        isOpened &&
        props.root.children.map(child => (
          <SideElement
            key={child}
            root={props.structure[child]}
            openFolders={props.openFolders}
            openFolder={props.openFolder}
            closeFolder={props.closeFolder}
            structure={props.structure}
            handleClickSideElement={props.handleClickSideElement}
          />
        ))}
    </div>
  ) : null;
};

class SideBar extends Component {
  state = {
    openFolders: ["root"]
  };

  openFolder = path => {
    this.setState(state => {
      return { openFolders: [...state.openFolders, path] };
    });
  };

  closeFolder = path => {
    this.setState(state => {
      return {
        openFolders: state.openFolders.filter(openPath => openPath !== path)
      };
    });
  };

  handleClickSideElement = path => {
    this.props.updatePath(path);
  };

  render() {
    return (
      <div className="sidebar-container">
        <SideElement
          root={this.props.structure["root"]}
          structure={this.props.structure}
          openFolders={this.state.openFolders}
          openFolder={this.openFolder}
          closeFolder={this.closeFolder}
          handleClickSideElement={this.handleClickSideElement}
        />
      </div>
    );
  }
}

export default SideBar;
