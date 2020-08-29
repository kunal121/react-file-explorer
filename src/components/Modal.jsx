import React, { Component } from "react";
// styles
import "../css/App.css";
// utils
import { folderImage, fileImage, closeButton } from "../utils/constants";

class Modal extends Component {
  state = {
    type: "file",
    name: "",
    date: "",
    creator: "",
    size: "",
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const { currNavPath } = this.props;
    const { name, type } = this.state;
    const itemPath = currNavPath + "/" + name;
    const response = {
      name: this.state.name,
      creator: this.state.creator,
      date: this.state.date,
      size: this.state.size,
      type: this.state.type,
      path: itemPath,
      children: []
    };
    const reg = /(.*?)\.(jpg|bmp|jpeg|png|txt)$/;
    if (type === "file" && name.match(reg)) {
      this.props.addData(itemPath, response, currNavPath);
      this.setState({
        error: ""
      });
      this.props.closeModal();
    } else if (type === "folder" && !name.match(reg)) {
      this.props.addData(itemPath, response, currNavPath);
      this.setState({
        error: ""
      });
      this.props.closeModal();
    } else {
      this.setState({
        error: "Invalid File Extention!!"
      });
    }
  };

  changeType = evt => {
    evt.stopPropagation();
    const { value } = evt.target.dataset;
    this.setState({
      type: value
    });
  };

  handleInput = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  showAddModal = () => {
    const { type, name, date, creator, size } = this.state;
    return (
      <div className="form">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-header">
            <div className="form-heading">Create New</div>
            <span className="close-button" onClick={this.props.closeModal}>
              <img alt="closeButton" src={closeButton} />
            </span>
          </div>
          <div className="item-type">
            <div
              className={`selected-item ${type === "file" ? "selected" : ""}`}
              onClick={this.changeType}
              data-value="file"
            >
              File
            </div>
            <div
              className={`selected-item ${type === "folder" ? "selected" : ""}`}
              onClick={this.changeType}
              data-value="folder"
            >
              Folder
            </div>
          </div>
          <input
            type="name"
            placeholder="Name"
            className="input-field"
            name="name"
            onChange={this.handleInput}
            value={name}
            required
          />
          <input
            type="text"
            placeholder="Creator"
            className="input-field"
            name="creator"
            onChange={this.handleInput}
            value={creator}
            required
          />
          <input
            type="number"
            placeholder="Size"
            className="input-field"
            name="size"
            onChange={this.handleInput}
            value={size}
            required
          />
          <input
            type="datetime"
            placeholder="Date"
            className="input-field"
            name="date"
            onChange={this.handleInput}
            value={date}
            required
          />
          <button type="submit" className="create-button">
            Create
          </button>
          <div className="error-message">{this.state.error}</div>
        </form>
      </div>
    );
  };

  showGetInfoModal = () => {
    const { objectDataOfClicked } = this.props;
    return (
      <div>
        <div className="info-header">
          <div className="info-heading">
            {`${objectDataOfClicked.type} Info`}
          </div>
          <span className="close-button" onClick={this.props.closeModal}>
            <img alt="closeButton" src={closeButton} />
          </span>
        </div>
        <div className="item-image">
          {objectDataOfClicked.type === "folder" ? (
            <img src={folderImage} alt="folderImage" />
          ) : (
            <img src={fileImage} alt="file" />
          )}
        </div>
        <div className="item-detail">
          <span>Name</span>: <span>{objectDataOfClicked["name"]}</span>
        </div>
        <div className="item-detail">
          <span>Size</span>: <span>{objectDataOfClicked["size"]}</span>
        </div>
        <div className="item-detail">
          <span>Creator Name</span>:{" "}
          <span>{objectDataOfClicked["creator"]}</span>
        </div>
        <div className="item-detail">
          <span>Creation Date</span>: <span>{objectDataOfClicked["date"]}</span>
        </div>
      </div>
    );
  };

  modalClick = evt => {
    evt.stopPropagation();
  };

  render() {
    const { show } = this.props;
    if (show === "") {
      return null;
    } else if (show === "addModal") {
      return (
        <div className="modal-container" onClick={this.modalClick}>
          {this.showAddModal()}
        </div>
      );
    }

    return (
      <div className="modal-container" onClick={this.modalClick}>
        {this.showGetInfoModal()}
      </div>
    );
  }
}

export default Modal;
