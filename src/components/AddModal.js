import React, { Component } from 'react';
import '../css/App.css'

class AddModal extends Component{
   state = {
      type: 'file',
      name: '',
      date: '',
      creator: '',
      size: '',
   }

    handleSubmit=(event)=>{
      event.preventDefault()
      this.props.closeModal()
      const {currNavPath} = this.props
      const {name} = this.state
      const itemPath = currNavPath + "/" + name
      const response = {
        name: this.state.name,
        creator:this.state.creator,
        date:this.state.date,
        size:this.state.size,
        type:this.state.type,
        path : this.props.currNavPath,
        children:[]
      }
      this.props.addData(itemPath,response,currNavPath)
    }

    changeType = evt => {
        const { value } = evt.target.dataset
        this.setState({
          type: value,
        })
    }

    handleInput = evt => {
        const { name, value } = evt.target
        this.setState({
          [name]: value,
        })
    }

    render(){
      if (!this.props.show) {
        return null
      }
      const {
        type,
        name,
        date,
        creator,
        size,
      } = this.state
      return(
        <div className="add-modal">
          <div className="form">
            <form onSubmit={(e)=>this.handleSubmit(e)}>
              <div className="form-header">
                <div className="form-heading">Create New</div>
                <span className="close-button" onClick={this.props.closeModal}><img src="http://nosmalltask2.s3-website.ap-south-1.amazonaws.com/assets/icons/functional/close.svg"/></span>
              </div>
              <div className="item-type">
                <div className={`selected-item ${type === 'file' ? 'selected' : ''}`}  onClick={this.changeType} data-value="file">File</div>
                <div className={`selected-item ${type === 'folder' ? 'selected' : ''}`} onClick={this.changeType} data-value="folder">Folder</div>
              </div>
              <input type="name" placeholder="Name" className="input-field"  name="name" onChange={this.handleInput} value={name} required/>
              <input type="text" placeholder="Creator" className="input-field" name="creator"  onChange={this.handleInput} value={creator} required/>
              <input type="number" placeholder="Size" className="input-field" name="size" onChange={this.handleInput} value={size} required/>
              <input type="datetime" placeholder="Date" className="input-field" name="date" onChange={this.handleInput} value={date} required/>
              <button type="submit" className="create-button">Create</button>
            </form>
          </div>
        </div>
      )
    }
}

export default AddModal;
