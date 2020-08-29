import React, { Component } from "react";
// styles
import "../css/App.css";
// component
import Modal from "./Modal";
import RightContext from "./RightContext";
// constants
import { folderImage, fileImage, addButtonImage } from "../utils/constants";

class Explorer extends Component {
  static filterNodes = (searchValue, searchList, structure) =>
    searchList.reduce((acc, childPath) => {
      if (structure[childPath].name.includes(searchValue)) {
        acc.push(childPath);
      }
      return acc;
    }, []);

  handleClick = e => {
    const { name } = e.currentTarget.dataset;
    if (e.type === "click") {
      this.props.updatePath(name);
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      this.props.showRightContextMenu(name, e.pageX, e.pageY);
    }
  };

  showView = nodesToShow => {
    const { structure: data } = this.props;
    return nodesToShow.reduce((acc, curr) => {
      const node = data[curr];
      if (node.type === "folder") {
        acc.push(
          <div
            className="type-folder"
            data-name={node.path}
            key={node.name}
            onClick={this.handleClick}
            onContextMenu={this.handleClick}
          >
            <img src={folderImage} alt="folder" />
            <div className="folder-name">{node.name}</div>
          </div>
        );
      } else {
        acc.push(
          <div
            className="type-file"
            data-name={node.path}
            key={node.name}
            onContextMenu={this.handleClick}
          >
            <img src={fileImage} alt="file" />
            <div className="file-name">{node.name}</div>
          </div>
        );
      }
      return acc;
    }, []);
  };

  showContentView = () => {
    const { structure, currNavPath, searchValue } = this.props;
    if (searchValue === "") {
      const nodesToShow = structure[currNavPath].children;
      return this.showView(nodesToShow);
    } else {
      const nodesToShow = Explorer.filterNodes(
        searchValue,
        structure[currNavPath].children,
        structure
      );
      return this.showView(nodesToShow);
    }
  };

  render() {
    const objectDataOfClicked = this.props.structure[this.props.pathOfClicked];
    const typeOfClicked = objectDataOfClicked && objectDataOfClicked.type;

    return (
      <div className="view-container">
        {this.showContentView()}
        <div
          className="add"
          onClick={() => this.props.setModalState("addModal")}
        >
          <img src={addButtonImage} alt="addButton" />
        </div>
        <Modal
          addData={this.props.addData}
          show={this.props.showModal}
          closeModal={this.props.closeAddModal}
          currNavPath={this.props.currNavPath}
          objectDataOfClicked={objectDataOfClicked}
          setModalState={this.props.setModalState}
        />
        <RightContext
          showModal={this.props.showRightContext}
          pagex={this.props.pagex}
          pagey={this.props.pagey}
          deleteData={this.props.deleteData}
          closeRightContextMenu={this.props.closeRightContextMenu}
          pathOfClicked={this.props.pathOfClicked}
          updatePath={this.props.updatePath}
          setModalState={this.props.setModalState}
          type={typeOfClicked}
        />
      </div>
    );
  }
}

export default Explorer;
