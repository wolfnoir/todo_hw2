import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

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

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null
  }

  goHome = () => {
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

  removeItem = (itemIndex, event) => {
    event.stopPropagation();
    this.state.currentList.items.splice(itemIndex,1);
    for(let i = 0; i < this.state.currentList.items.length; i++){
      this.state.currentList.items[i].key = i;
    }
    this.loadList(this.state.currentList);
  }

  moveItemUp = (itemIndex, event) => {
    event.stopPropagation();
    if(itemIndex !== 0){
        let tempItem = this.state.currentList.items[itemIndex];
        tempItem.key = itemIndex - 1;
        this.state.currentList.items[itemIndex - 1].key = itemIndex;
        this.state.currentList.items[itemIndex] = this.state.currentList.items[itemIndex - 1]; //switch w the one above it
        this.state.currentList.items[itemIndex - 1] = tempItem;
        this.loadList(this.state.currentList);
    }
  }

  moveItemDown = (itemIndex, event) => {
    event.stopPropagation();
    if(itemIndex !== this.state.currentList.items.length - 1){
        let tempItem = this.state.currentList.items[itemIndex];
        tempItem.key = itemIndex + 1;
        this.state.currentList.items[itemIndex + 1].key = itemIndex;
        this.state.currentList.items[itemIndex] = this.state.currentList.items[itemIndex + 1]; //switch w the one below it
        this.state.currentList.items[itemIndex + 1] = tempItem;
        this.loadList(this.state.currentList);
    }
  }

  handleSubmitItem = (currentItem, event) => {
    event.preventDefault();
    let newItem = new Object();
    newItem.description = document.getElementById('item_description_textfield').value;
    newItem.assigned_to = document.getElementById('item_assigned_to_textfield').value;
    newItem.due_date = document.getElementById('item_due_date_picker').value;
    newItem.completed = document.getElementById('item_completed_checkbox').checked;
    if(currentItem){ //if its true then we're editing
      let currentIndex = currentItem.key;
      newItem.key = currentIndex;
      this.state.currentList.items[currentIndex] = newItem;
    }
    else{
      let currentIndex = this.state.currentList.items.length;
      newItem.key = currentIndex;
      this.state.currentList.items[currentIndex] = newItem;
    }
    this.loadList(this.state.currentList);
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
          moveItemDown = {this.moveItemDown.bind(this)} />;
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