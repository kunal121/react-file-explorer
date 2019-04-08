import React, { Component } from 'react';
import '../css/App.css'
import NavBar from './NavBar.js'
import View from './View.js'
import {initialPath} from '../utils/constants.js'

class SideView extends Component {
    constructor(props){
        super(props)
        this.state = {
            currNavPath:initialPath
        }
    }
    updatePath = path =>{
        this.setState(state=>{
            return {currNavPath:state.currNavPath + "/" + path}
        })
    }
    updatePathOnBackClick=path=>{
        this.setState({currNavPath:path})
    }
    render(){
        return(
            <div className="sideview-container">
                <NavBar currNavPath={this.state.currNavPath} updatePathOnBackClick={this.updatePathOnBackClick}/>
                <View 
                structure={this.props.structure} 
                currNavPath={this.state.currNavPath}
                updatePath={this.updatePath}
                addData={this.props.addData}
                /> 
            </div>
        )
    }
}

export default SideView;