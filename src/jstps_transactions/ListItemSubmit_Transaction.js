class ListItemSubmit_Transaction{
    constructor(currentList, currentItem, newItem){
        this.todoList = currentList;
        this.currentItem = currentItem;
        this.newItem = newItem;
    }

    doTransaction(){
        if(this.currentItem){ //if its true then we're editing
            let currentIndex = this.currentItem.key;
            this.newItem.key = currentIndex;
            this.todoList.items[currentIndex] = this.newItem;
        }
        else{
            let currentIndex = this.todoList.items.length;
            this.newItem.key = currentIndex;
            this.todoList.items[currentIndex] = this.newItem;
        }
    }

    undoTransaction(){
        if(this.currentItem){ //if true, undo edit
            let currentIndex = this.currentItem.key;
            this.todoList.items[currentIndex] = this.currentItem;
        }
        else{ //undo add new item
            this.todoList.items.splice(this.newItem.key,1); //remove one item @ newItem.key (which should be the new item)
            for(let i = 0; i < this.todoList.items.length; i++){
                this.todoList.items[i].key = i;
            }
        }
    }
}

export default ListItemSubmit_Transaction