import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import PropTypes from 'prop-types';

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                <div className="list_item_task_header"
                    onClick = {this.props.sortByTask.bind(this, this.props.todoList)}>Task</div>
                <div className="list_item_due_date_header"
                    onClick = {this.props.sortByDueDate.bind(this, this.props.todoList)}>Due Date</div>
                <div className="list_item_status_header"
                    onClick = {this.props.sortByStatus.bind(this, this.props.todoList)}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem}
                            todoList={this.props.todoList}
                            loadItem = {this.props.loadItem}
                            listLength = {this.props.listLength}
                            removeItem = {this.props.removeItem}
                            moveItemUp = {this.props.moveItemUp}
                            moveItemDown = {this.props.moveItemDown}/>
                    ))
                }
                <div className="list_item_add_card"
                    onClick = {this.props.loadItem.bind(this, null)}
                    ><b>+</b></div>
            </div>
        )
    }
}

ListItemsTable.propTypes = {
    loadItem: PropTypes.func.isRequired
}

export default ListItemsTable
