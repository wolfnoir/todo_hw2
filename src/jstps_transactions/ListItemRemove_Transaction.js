class ListItemRemove_Transaction{
    constructor(currentList, indexOfItem){
        //the current list we are working with
        this.todoList = currentList;
        this.itemIndex = indexOfItem;
        this.itemRemoved = this.todoList.items[this.itemIndex];
    }

    doTransaction(){
        this.todoList.items.splice(this.itemIndex,1);
        for(let i = 0; i < this.todoList.items.length; i++){
          this.todoList.items[i].key = i;
        }
    }

    undoTransaction(){
        this.todoList.items.splice(this.itemIndex,0,this.itemRemoved);
        for(let i = 0; i < this.todoList.items.length; i++){
            this.todoList.items[i].key = i;
        }
    }
}

export default ListItemRemove_Transaction