import React, { Component } from 'react';
import '../css/App.css'

const SideElement = props => {
    const isFolder = (props.root.type === 'folder')
    const hasChildren = (props.root.children.length > 0)
    const isOpened = (props.openFolders.includes(props.root.path))
    return isFolder ? (
      <div className="sidebar-element">
            <div className="element-container">
                <span className="sidebar-name">
                    {props.root.name}
                    {' '}
                </span>
                {hasChildren && (isOpened ? (
                    <img className="side-button" src="http://nosmalltask2.s3-website.ap-south-1.amazonaws.com/assets/icons/functional/dropdown.svg" onClick={()=>props.closeFolder(props.root.path)}/>
                ) : (
                    <img className="side-button" src="http://nosmalltask2.s3-website.ap-south-1.amazonaws.com/assets/icons/functional/dropdown.svg" onClick={()=>props.openFolder(props.root.path)} className="make-down"/>
                    ))}
            </div>
        {
          hasChildren &&
          isOpened &&
          props.root.children.map(child => (
            <SideElement
            root={props.structure[child]}
            openFolders={props.openFolders}
            openFolder={props.openFolder}
            closeFolder={props.closeFolder}
            structure={props.structure}
            />
          ))
        }
      </div>
    ) : null
  }

class SideBar extends Component{
    state = {
        openFolders: ['root']
        }

        openFolder = path => {
            this.setState(state => {
                return {openFolders:[...state.openFolders,path]}
            })
        }

        closeFolder = path => {
            this.setState(state => {
                return {openFolders:state.openFolders.filter(openPath => (openPath !== path))}
            })
        }

        render(){
        return(
        <div className="sidebar-container">
            <SideElement
                root={this.props.structure['root']}
                structure={this.props.structure}
                openFolders={this.state.openFolders}
                openFolder={this.openFolder}
                closeFolder={this.closeFolder}
            />
        </div>
        )
    }
}

export default SideBar