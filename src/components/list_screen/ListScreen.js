import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    state = {
        name: '',
        owner: ''
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

    setName(newName){
        this.setState({name: newName});
    }

    setOwner(newOwner){
        this.setState({owner: newOwner});
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
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                            onKeyUp={event => this.setName(event.target.value)} />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield"
                            onKeyUp={event => this.setOwner(event.target.value)} />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList}
                loadItem = {this.props.loadItem}/>
            </div>
        )
    }
}

ListScreen.propTypes = {
    loadItem: PropTypes.func.isRequired,
    listItem: PropTypes.object.isRequired
}

export default ListScreen
