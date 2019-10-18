class ListNameChange_Transaction{
    constructor(currentList, newName){
        //currentList
        this.list = currentList;
        //the new name of the list
        this.name = newName;
        //the original name of the list
        this.oldName = currentList.name;
    }

    doTransaction(){
        this.list.name = this.name;
        let textfield = document.getElementById('list_name_textfield');
        textfield.value = this.list.name;
    }

    undoTransaction(){
        this.list.name = this.oldName;
        let textfield = document.getElementById('list_name_textfield');
        textfield.value = this.list.name;
    }
}


export default ListNameChange_Transaction