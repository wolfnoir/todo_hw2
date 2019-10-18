class ListMoveItemUp_Transaction{
    constructor(currentList, indexOfItem){
        //the current list we are working with
        this.todoList = currentList;
        this.itemIndex = indexOfItem;
    }

    doTransaction(){
        if(this.itemIndex !== 0){
            let tempItem = this.todoList.items[this.itemIndex];
            tempItem.key = this.itemIndex - 1;
            this.todoList.items[this.itemIndex - 1].key = this.itemIndex;
            this.todoList.items[this.itemIndex] = this.todoList.items[this.itemIndex - 1]; //switch w the one above it
            this.todoList.items[this.itemIndex - 1] = tempItem;
        }
    }

    undoTransaction(){
        let tempItem = this.todoList.items[this.itemIndex];
        tempItem.key = this.itemIndex - 1;
        this.todoList.items[this.itemIndex - 1].key = this.itemIndex;
        this.todoList.items[this.itemIndex] = this.todoList.items[this.itemIndex - 1]; //switch w the one above it
        this.todoList.items[this.itemIndex - 1] = tempItem;
    }
}

export default ListMoveItemUp_Transaction