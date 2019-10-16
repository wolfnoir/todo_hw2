import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    getItemDescription() {
        if (this.props.listItem) {
            let description = this.props.listItem.description;
            return this.props.listItem.description;
        }
        else
            return "";
    }

    getItemAssignedTo() {
        if (this.props.listItem) {
            let assignedTo = this.props.listItem.assigned_to;
            return this.props.listItem.assigned_to;
        }
        else
            return "";
    }

    getItemDate() {
        if (this.props.listItem) {
            let dueDate = this.props.listItem.due_date;
            return this.props.listItem.due_date;
        }
        else
            return "";
    }

    getItemCompleted() {
        if (this.props.listItem) {
            let completed = this.props.listItem.completed;
            return this.props.listItem.completed;
        }
        else
            return false;
    }

    isNewItem(){
        return !this.props.listItem;
    }

    render() {
        return (
            <div id="todo_item">
                <div id="item_form_container">
                    <div id="item_heading">Item</div>
                    <br />
                    <span id="item_description_prompt" className="item_prompt">Description:</span>
                    <input
                        type="text"
                        id="item_description_textfield"
                        className="item_input"
                        value={this.getItemDescription()} 
                    />
                    <br />
                    <span id="item_assigned_to_prompt" className="item_prompt">Assigned To:</span>
                    <input
                        type="text"
                        id="item_assigned_to_textfield"
                        className="item_input"
                        value={this.getItemAssignedTo()} 
                    />
                    <br />
                    <span id="item_due_date_prompt" className="item_prompt">Due Date:</span>
                    <input
                        type="date"
                        id="item_due_date_picker"
                        className="item_input"
                        value={this.getItemDate()} 
                    />
                    <br />
                    <span id="item_completed_prompt" className="item_prompt">Completed:</span>
                    <input
                        type="checkbox"
                        id="item_completed_checkbox"
                        className="item_input"
                        value={this.getItemCompleted()} 
                    />
                </div>
                <button id="item_form_submit_button">Submit</button>
                <button
                    id="item_form_cancel_button"
                    onClick = {this.props.loadList.bind(this, this.props.todoList)}
                    >Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    listItem: PropTypes.object.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ItemScreen
