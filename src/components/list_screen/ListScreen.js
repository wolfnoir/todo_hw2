import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    delList = () =>{
        let dialog = document.getElementById("modal_yes_no_dialog");
        dialog.classList.add("is_visible");
    }

    cancelDelList = () => {
        let dialog = document.getElementById("modal_yes_no_dialog");
        dialog.classList.remove("is_visible");
    }

    updateListName = () =>{
        this.props.updateListName(document.getElementById("list_name_textfield").value);
    }

    updateListOwner = () => {
        this.props.updateListOwner(document.getElementById("list_owner_textfield").value);
    }

    onKeyPressed = (e) =>{
        this.props.keyPressed(e);
    }

    componentWillMount() {
        let todoListDiv = document.getElementById('todo_list');
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }
  
    componentWillUnmount() {
        let todoListDiv = document.getElementById('todo_list');
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }  

    render() {
        return (
            <div id="todo_list"
                tabIndex="0"
                onKeyDown = {this.onKeyPressed}>
                <ListHeading goHome={this.props.goHome} />
                <ListTrash 
                    delList = {this.delList.bind(this)}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.getListName()} 
                            name="listName"
                            type="text" 
                            id="list_name_textfield"
                            onChange={this.updateListName} />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            name="listOwner"
                            id="list_owner_textfield"
                            onChange={this.updateListOwner} />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList}
                    loadItem = {this.props.loadItem}
                    listLength = {this.props.listLength}
                    removeItem = {this.props.removeItem}
                    moveItemUp = {this.props.moveItemUp}
                    moveItemDown = {this.props.moveItemDown}
                    sortByTask = {this.props.sortByTask}
                    sortByDueDate = {this.props.sortByDueDate}
                    sortByStatus = {this.props.sortByStatus}/>

                <div id="modal_yes_no_dialog" className="modal" hidden>
                    <div className="modal_content">
                        <div className="modal_header">
                          Delete List?
                        </div>
                        <div className="modal_body">
                          <p><b>Are you sure you want to delete this list?</b></p>
                          <button id="modal_yes_button"
                          className="modal_button"
                          onClick = {this.props.confirmDelList.bind(this)}>
                              Yes</button>
                          <button id="modal_no_button" className="modal_button" onClick ={this.cancelDelList.bind(this)}>No</button>
                          <br/>
                          <br/>
                        </div>
                        <div className="modal_footer">
                          The list will not be retrievable.
                        </div>
                      </div>
                </div>
            </div>
        )
    }
}

ListScreen.propTypes = {
    loadItem: PropTypes.func.isRequired
}

export default ListScreen
