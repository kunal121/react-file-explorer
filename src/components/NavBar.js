import React, { Component } from 'react';
import '../css/App.css'
import {arrowIcon,initialPath} from '../utils/constants.js'

class NavBar extends Component {
    constructor(props){
        super(props)
        this.state={
            path:initialPath
        }
    }
    render(){
        return(
            <div className="navbar-container">
                <div className="back-button" onClick={this.changePathOnBackClick}>
                    <img src={arrowIcon} alt="button to go back" />
                </div>
                <div className="path-navigation">
                    {this.state.path}
                </div>
            </div>
        )
    }
}

export default NavBar;