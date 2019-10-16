import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    state = {
        listName: this.getListName(),
        listOwner: this.getListOwner()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
        if(e.target.name === "listName")
            this.props.todoList.name = e.target.value;
        else
            this.props.todoList.owner = e.target.value;
    }

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

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.state.listName} 
                            name="listName"
                            type="text" 
                            id="list_name_textfield"
                            onChange={this.onChange} />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.state.listOwner}
                            type="text" 
                            name="listOwner"
                            id="list_owner_textfield"
                            onChange={this.onChange} />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList}
                loadItem = {this.props.loadItem}/>
            </div>
        )
    }
}

ListScreen.propTypes = {
    loadItem: PropTypes.func.isRequired
}

export default ListScreen
