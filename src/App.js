import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jstps/jsTPS.js';
import ListNameChange_Transaction from './jstps_transactions/ListNameChange_Transaction.js';
import ListOwnerChange_Transaction from './jstps_transactions/ListOwnerChange_Transaction.js';
import ListItemRemove_Transaction from './jstps_transactions/ListItemRemove_Transaction.js';
import ListMoveItemDown_Transaction from './jstps_transactions/ListMoveItemDown_Transaction.js'
import ListMoveItemUp_Transaction from './jstps_transactions/ListMoveItemUp_Transaction.js'
import ListItemSubmit_Transaction from './jstps_transactions/ListItemSubmit_Transaction.js'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}

let tps = new jsTPS();

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    currentSort: "sort_by_task_increasing"
  }

  goHome = () => {
    tps.clearAllTransactions();
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    this.setState({currentItem: null});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  loadItem = (itemToLoad) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({currentItem: itemToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentItem: " + this.state.currentItem);
    console.log("currentScreen: " + this.state.currentScreen);
  }
  
  makeNewTodo = () => {
    let newList = Object();
    newList.key = this.state.todoLists.length;
    newList.name = "Unknown";
    newList.owner = "Unknown";
    newList.items = [];
    this.state.todoLists[this.state.todoLists.length] = newList;
    this.loadList(newList);
  }

  updateListName = (newName) =>{
    let transaction = new ListNameChange_Transaction(this.state.currentList, newName);
    tps.addTransaction(transaction);
    console.log(transaction);
  }

  updateListOwner = (newOwner) =>{
    let transaction = new ListOwnerChange_Transaction(this.state.currentList, newOwner);
    tps.addTransaction(transaction);
    console.log(transaction);
  }

  removeItem = (itemIndex, event) => {
    event.stopPropagation();
    let transaction = new ListItemRemove_Transaction(this.state.currentList, itemIndex);
    console.log(transaction)
    tps.addTransaction(transaction);
    this.loadList(this.state.currentList);
  }

  moveItemUp = (itemIndex, event) => {
    event.stopPropagation();
    let transaction = new ListMoveItemUp_Transaction(this.state.currentList, itemIndex);
    tps.addTransaction(transaction);
    this.loadList(this.state.currentList);
  }

  moveItemDown = (itemIndex, event) => {
    event.stopPropagation();
    let transaction = new ListMoveItemDown_Transaction(this.state.currentList, itemIndex);
    tps.addTransaction(transaction);
    this.loadList(this.state.currentList);
  }

  handleSubmitItem = (currentItem, event) => {
    event.preventDefault();
    let newItem = new Object();
    newItem.description = document.getElementById('item_description_textfield').value;
    newItem.assigned_to = document.getElementById('item_assigned_to_textfield').value;
    newItem.due_date = document.getElementById('item_due_date_picker').value;
    newItem.completed = document.getElementById('item_completed_checkbox').checked;
    let transaction = new ListItemSubmit_Transaction(this.state.currentList, currentItem, newItem);
    tps.addTransaction(transaction);
    this.loadList(this.state.currentList);
  }

  sortByTask = () => {
    if(this.state.currentSort === ItemSortCriteria.SORT_BY_TASK_INCREASING){
        this.setState({currentSort: ItemSortCriteria.SORT_BY_TASK_DECREASING});
    }
    else{
      this.setState({currentSort: ItemSortCriteria.SORT_BY_TASK_INCREASING});
    }
    this.sortTasks(this);
  }

  sortByDueDate = () => {
    if(this.state.currentSort === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING){
      this.setState({currentSort: ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING});
    }
    else{
      this.setState({currentSort: ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING});
    }
    this.sortTasks(this);
  }

  sortByStatus = () => {
    if(this.state.currentSort === ItemSortCriteria.SORT_BY_STATUS_INCREASING){
      this.setState({currentSort: ItemSortCriteria.SORT_BY_STATUS_DECREASING});
    }
    else{
      this.setState({currentSort: ItemSortCriteria.SORT_BY_STATUS_INCREASING});
    }
    this.sortTasks(this);
  }

  sortTasks = () => {
    this.state.currentList.items.sort(this.compare.bind(this));
    for(let i = 0; i < this.state.currentList.items.length; i++){
      this.state.currentList.items[i].key = i;
    }
    this.loadList(this.state.currentList);
  }

  compare = (item1, item2) => {
    // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
    if (this.state.currentSort === ItemSortCriteria.SORT_BY_TASK_DECREASING
        || this.state.currentSort === ItemSortCriteria.SORT_BY_STATUS_DECREASING
        || this.state.currentSort === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
        let temp = item1;
        item1 = item2;
        item2 = temp;
    }
    // SORT BY ITEM DESCRIPTION
    if (this.state.currentSort === ItemSortCriteria.SORT_BY_TASK_INCREASING
        || this.state.currentSort === ItemSortCriteria.SORT_BY_TASK_DECREASING) {
        if (item1.description < item2.description)
            return -1;
        else if (item1.description > item2.description)
            return 1;
        else
            return 0;
    }

    // SORT BY DUE DATE
    if (this.state.currentSort === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
        || this.state.currentSort === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
        if (item1.due_date < item2.due_date)
            return -1;
        else if (item1.due_date > item2.due_date)
            return 1;
        else
            return 0;
    }

    // SORT BY COMPLETED
    else {
        if (item1.completed && !item2.completed)
            return -1;
        else if (!item1.completed && item2.completed)
            return 1;
        else
            return 0;
    }
  }

  confirmDelList = () => {
    let listIndex = this.state.currentList.key;
    this.state.todoLists.splice(listIndex,1);
    for(let i = 0; i < this.state.todoLists.length; i++){
      this.state.todoLists[i].key = i;
    }
    this.goHome();
  }

  keyPressed = (e) => {
    if(this.state.currentScreen === "LIST_SCREEN"){
      if((e.which === 90 || e.keyCode === 90) && e.ctrlKey){
        //undo
        tps.undoTransaction();
        this.loadList(this.state.currentList);
      }
      else if ((e.which === 89 || e.keyCode === 89) && e.ctrlKey){
        //redo
        if(tps.peekDo() === null){
          return;
        }
        else{
          tps.doTransaction();
          this.loadList(this.state.currentList);
        }
      }
    }
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
          loadList={this.loadList.bind(this)} 
          todoLists={this.state.todoLists}
          makeNewTodo = {this.makeNewTodo.bind(this)}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          loadItem = {this.loadItem.bind(this)}
          listLength={this.state.currentList.items.length}
          removeItem={this.removeItem.bind(this)}
          moveItemUp = {this.moveItemUp.bind(this)}
          moveItemDown = {this.moveItemDown.bind(this)}
          sortByTask = {this.sortByTask.bind(this)}
          sortByDueDate = {this.sortByDueDate.bind(this)}
          sortByStatus = {this.sortByStatus.bind(this)}
          confirmDelList = {this.confirmDelList.bind(this)}
          updateListName = {this.updateListName.bind(this)}
          updateListOwner = {this.updateListOwner.bind(this)}
          keyPressed = {this.keyPressed.bind(this)} />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
          todoList={this.state.currentList}
          listItem = {this.state.currentItem}
          loadList = {this.loadList.bind(this)}
          handleSubmitItem = {this.handleSubmitItem.bind(this)}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;