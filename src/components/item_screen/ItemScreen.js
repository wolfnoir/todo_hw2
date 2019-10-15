import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div id="todo_item">
                <div id="item_form_container">
                    <div id="item_heading">Item</div>
                    <br />
                    <span id="item_description_prompt" class="item_prompt">Description:</span>
                    <input
                        type="text"
                        id="item_description_textfield"
                        class="item_input"
                    />
                    <br />
                    <span id="item_assigned_to_prompt" class="item_prompt">Assigned To:</span>
                    <input
                        type="text"
                        id="item_assigned_to_textfield"
                        class="item_input"
                    />
                    <br />
                    <span id="item_due_date_prompt" class="item_prompt">Due Date:</span>
                    <input
                        type="date"
                        id="item_due_date_picker"
                        class="item_input"
                    />
                    <br />
                    <span id="item_completed_prompt" class="item_prompt">Completed:</span>
                    <input
                        type="checkbox"
                        id="item_completed_checkbox"
                        class="item_input"
                    />
                </div>
                <button id="item_form_submit_button">Submit</button>
                <button id="item_form_cancel_button">Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired,
    todoList: PropTypes.object.isRequired
}

export default ItemScreen
