class ListOwnerChange_Transaction{
    constructor(currentList, newOwner){
        //currentList
        this.list = currentList;
        //the new name of the list
        this.owner = newOwner;
        //the original name of the list
        this.oldOwner = currentList.owner;
    }

    doTransaction(){
        this.list.owner = this.owner;
        let textfield = document.getElementById('list_owner_textfield');
        textfield.value = this.list.owner;
    }

    undoTransaction(){
        this.list.owner = this.oldOwner;
        let textfield = document.getElementById('list_owner_textfield');
        textfield.value = this.list.owner;
    }
}


export default ListOwnerChange_Transaction