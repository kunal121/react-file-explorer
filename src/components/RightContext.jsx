import React, { Component } from "react";
// styles
import "../css/App.css";

class RightContext extends Component {
  constructor(props) {
    super();
  }

  handleOptionClick = evt => {
    const { pathOfClicked } = this.props;
    const optionName = evt.currentTarget.innerHTML;
    if (optionName === "Open") {
      evt.stopPropagation();
      if (this.props.type === "folder") {
        this.props.updatePath(pathOfClicked);
      }
    } else if (optionName === "GetInfo") {
      evt.stopPropagation();
      this.props.setModalState("getInfo");
    } else {
      evt.stopPropagation();
      this.props.deleteData(pathOfClicked);
    }
    this.props.closeRightContextMenu();
  };

  createContextMenu = optionArr => {
    return optionArr.map(option => {
      return (
        <div className="context-option" key={option}>
          <span className="option-name" onClick={this.handleOptionClick}>
            {option}
          </span>
        </div>
      );
    });
  };

  render() {
    let styles = {
      left: this.props.pagex - 5,
      right: this.props.pagey,
      top: this.props.pagey + 15
    };
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div className="context-container" style={styles}>
        {this.createContextMenu(["Open", "GetInfo", "Delete"])}
      </div>
    );
  }
}

export default RightContext;
