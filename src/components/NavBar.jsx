import React, { Component } from "react";
// styles
import "../css/App.css";
// utils
import { arrowIcon } from "../utils/constants.js";

class NavBar extends Component {
  changePathOnBackClick = () => {
    const { currNavPath, updatePath } = this.props;
    let splitarr = currNavPath.split("/");
    if (splitarr.length > 1) {
      splitarr.pop();
      const updatedPath = splitarr.join("/");
      updatePath(updatedPath);
    }
  };

  handleSearchInput = evt => {
    this.props.setSearchValue(evt.target.value);
  };

  render() {
    const { searchValue } = this.props;
    return (
      <div className="navbar-container">
        <div className="back-button" onClick={this.changePathOnBackClick}>
          <img src={arrowIcon} alt="button to go back" />
        </div>
        <div className="path-navigation">{this.props.currNavPath}</div>
        <div className="search-container">
          <button
            type="submit"
            onClick={this.handleSubmitSearch}
            className="search-button"
          >
            <img
              src="http://nosmalltask2.s3-website.ap-south-1.amazonaws.com/assets/icons/functional/search.svg"
              alt="searchButton"
            />
          </button>
          <input
            className="search-bar"
            type="name"
            placeholder="Search for anything"
            onChange={this.handleSearchInput}
            value={searchValue}
          />
        </div>
      </div>
    );
  }
}

export default NavBar;
