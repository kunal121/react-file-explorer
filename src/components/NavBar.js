import React, { Component } from 'react';
import '../css/App.css'
import {arrowIcon} from '../utils/constants.js'

class NavBar extends Component {
    changePathOnBackClick = () => {
        const {currNavPath} = this.props
        let splitarr = currNavPath.split('/')
        if(splitarr.length > 1){
            splitarr.pop()
            const updatedPath = splitarr.join('/')
            this.props.updatePathOnBackClick(updatedPath)
        }
    }
    render(){
        return(
            <div className="navbar-container">
                <div className="back-button" onClick={this.changePathOnBackClick}>
                    <img src={arrowIcon} alt="button to go back" />
                </div>
                <div className="path-navigation">
                    {this.props.currNavPath}
                </div>
            </div>
        )
    }
}

export default NavBar;