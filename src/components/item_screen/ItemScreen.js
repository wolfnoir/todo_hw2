import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        itemDescription: this.getItemDescription(),
        itemAssignedTo: this.getItemAssignedTo(),
        itemDate: this.getItemDate(),
        itemCompleted: this.getItemCompleted(),
        todoList: this.props.todoList
    }

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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    onCheck = (e) =>{
        this.setState({ itemCompleted: e.target.checked });
    }

    render() {
        return (
            <form id="todo_item" onSubmit = {this.props.handleSubmitItem.bind(this, this.props.listItem)}>
                <div id="item_form_container">
                    <div id="item_heading">Item</div>
                    <br />
                    <span id="item_description_prompt" className="item_prompt">Description:</span>
                    <input
                        type="text"
                        id="item_description_textfield"
                        className="item_input"
                        name="itemDescription"
                        value={this.state.itemDescription} 
                        onChange = {this.onChange}
                    />
                    <br />
                    <span id="item_assigned_to_prompt" className="item_prompt">Assigned To:</span>
                    <input
                        type="text"
                        id="item_assigned_to_textfield"
                        className="item_input"
                        name="itemAssignedTo"
                        value={this.state.itemAssignedTo} 
                        onChange = {this.onChange}
                    />
                    <br />
                    <span id="item_due_date_prompt" className="item_prompt">Due Date:</span>
                    <input
                        type="date"
                        id="item_due_date_picker"
                        className="item_input"
                        name="itemDate"
                        value={this.state.itemDate}
                        onChange = {this.onChange} 
                    />
                    <br />
                    <span id="item_completed_prompt" className="item_prompt">Completed:</span>
                    <input
                        type="checkbox"
                        id="item_completed_checkbox"
                        className="item_input"
                        name="itemCompleted"
                        checked={this.state.itemCompleted}
                        onChange = {this.onCheck}
                    />
                </div>
                <button id="item_form_submit_button"
                    type="submit"
                    >Submit</button>
                <button
                    id="item_form_cancel_button"
                    onClick = {this.props.loadList.bind(this, this.props.todoList)}
                    >Cancel</button>
            </form>
        )
    }
}

ItemScreen.propTypes = {
    listItem: PropTypes.object.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ItemScreen
