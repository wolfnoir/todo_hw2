import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ListItemCard extends Component {
    getCompletedStyle = () => {
        return{
            color: this.props.listItem.completed ?
            '#669966' : '#FF0000'
        }
    }

    render() {
        const isCompleted = this.props.listItem.completed;
        let statusText;
        const indexNum = this.props.listItem.key;
        let upButtonClass = 'list_item_card_button';
        let downButtonClass = 'list_item_card_button';
        if (isCompleted){
            statusText = "Completed";
        }
        else{
            statusText = "Pending";
        }
        if(indexNum == 0){
            upButtonClass = 'list_item_card_button disabled';
        }
        
        return (
            <div className='list_item_card' onClick = {this.props.loadItem.bind(this, this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed' style={this.getCompletedStyle()}>
                    {statusText}
                </div>
                <div className='list_item_card_toolbar'>
                    <button className={upButtonClass}>&#8679;</button>
                    <button className={downButtonClass}>&#8681;</button>
                    <button className='list_item_card_button'>&#10006;</button>
                </div>
            </div>
        )
    }
}

ListItemCard.propTypes = {
    loadItem: PropTypes.func.isRequired,
    listItem: PropTypes.object.isRequired
}


export default ListItemCard
