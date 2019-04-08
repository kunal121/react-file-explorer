import React, { Component } from 'react';
import '../css/App.css'
import AddModal from './AddModal' 
import { folderImage, fileImage , addButtonImage } from '../utils/constants';

class View extends Component {
    state = {
        show:false
    }
    handleClick = e => {
        const {name} = e.currentTarget.dataset
        this.props.updatePath(name)
    }

    showView = data => {
        return Object.keys(data).reduce((acc,curr)=>{
            const {path} = data[curr]
            const {children} = data[curr]
            if(path===this.props.currNavPath){
                if(children.length > 0 ){
                    children.forEach(child => {
                        if (data[child].type === 'folder'){
                            acc.push(<div 
                                className="type-folder"
                                data-name={data[child].name}
                                key={data[child].name}
                                onClick={this.handleClick}>
                                    <img src={folderImage} alt="folder"/>
                                    <div className="folder-name">
                                    {data[child].name}
                                    </div>
                                </div>)
                        }
                        else {
                            acc.push(<div 
                                className="type-file"
                                key={data[child].name}>
                                    <img src={fileImage} alt="file"/>
                                    <div className="file-name">
                                        {data[child].name}
                                    </div>
                                </div>)
                        }
                    });
                }
            }
            return acc
        },[])
    }

    showAddModal=()=>{
        this.setState({show:true})
    }
    
    closeModal=()=>{
        this.setState({show:false})
    }

    render(){
        return(
            <div className="view-container">
                {this.showView(this.props.structure)}
                <div className="add" onClick={this.showAddModal}>
                        <img src={addButtonImage} alt="addButton" />
                </div>
                <AddModal 
                addData={this.props.addData}
                show={this.state.show}
                closeModal={this.closeModal}
                currNavPath={this.props.currNavPath}
                />
            </div>
        )
    }
}
export default View;