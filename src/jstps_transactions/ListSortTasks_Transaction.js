const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
  }

class ListSortTasks_Transaction{
      
    constructor(currentList, oldList, currentSort){
        //the current list we are working with
        this.todoList = currentList;
        this.oldList = oldList;
        this.sortCriteria = currentSort;
    }

    doTransaction(){
        this.todoList.items.sort(this.compare.bind(this));
        for(let i = 0; i < this.todoList.items.length; i++){
            this.todoList.items[i].key = i;
        }
        console.log(this.listItems);
        console.log(this.todoList);
    }

    undoTransaction(){
        this.todoList = this.oldList;
    }

    compare = (item1, item2) => {
        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.sortCriteria === ItemSortCriteria.SORT_BY_TASK_DECREASING
            || this.sortCriteria === ItemSortCriteria.SORT_BY_STATUS_DECREASING
            || this.sortCriteria === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.sortCriteria === ItemSortCriteria.SORT_BY_TASK_INCREASING
            || this.sortCriteria === ItemSortCriteria.SORT_BY_TASK_DECREASING) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
    
        // SORT BY DUE DATE
        if (this.sortCriteria === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
            || this.sortCriteria === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
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
}

export default ListSortTasks_Transaction