import {TodoList} from "./UI/components/TodoList.js";
import {TodoListComponent} from "./UI/components/TodoListComponent.js";
import {TodoCreatorComponent} from "./UI/components/TodoCreatorComponent.js";
import {TodoMain} from "./UI/components/TodoMain.js";
import {TodoActionsBar} from "./UI/components/TodoActionsBar.js";


const todoBoard = document.querySelector('.todo-board');
const todoToolBar = document.querySelector('.todos-toolbar');
const todoListElement = document.querySelector('.todos-list');
const todoList = new TodoList(todoListElement);
const todoListComponent = new TodoListComponent(todoListElement, todoList);
todoList.setComponent(todoListComponent);
const todoCreatorElement = document.querySelector('.todo-creator');
const todoCreatorComponent = new TodoCreatorComponent(todoCreatorElement);

const todoMain = new TodoMain(todoBoard);
const todoActionsBar = new TodoActionsBar(todoToolBar);

function loadToDos() {
    var request = new XMLHttpRequest();
    request.open('POST', '/read', true);
    request.addEventListener('readystatechange', function () {
        if ((request.readyState === 4) && (request.status === 200)) {
            var todos = JSON.parse(request.responseText);
            if (todos != null) {
                for (var i = 0; i < todos.length; i++) {
                    var component = todoListComponent.addTodo(todos[i].description, todos[i].id);
                    if (todos[i].checked)
                        todoListComponent.editState(component);
                    todoList.trigger('itemAdd');
                }
            }
        }
    });
    request.send();
}

loadToDos();

todoCreatorComponent.on('todoAdded', text => {
    todoListComponent.createTodo(text);
})
;

todoCreatorComponent.on('markAllAsDone', () => {
    todoList.markAllAsDone();
    todoList.trigger('itemCheck');
})
;

todoList.on('itemAdd', itemsCountWatcher);
todoList.on('itemDelete', itemsCountWatcher);
todoList.on('itemCheck', itemsCountWatcher);

todoActionsBar.on(
    'clearCompleted',
    function () {
        todoList.removeCompletedItems();
    }
);

todoActionsBar.on('filterSelected', function (filterId) {
    todoList.setFilter(filterId);
});


function itemsCountWatcher() {
    var itemsCount = todoList.getItemsCount();
    var completed = todoList.getCompleted();
    if (itemsCount !== 0)
        todoMain.showFullInterface();
    else
        todoMain.hideFullInterface();
    if (completed > 0)
        todoActionsBar.showRemoveButton();
    else
        todoActionsBar.hideRemoveButton();

    todoActionsBar.setItemsCount(itemsCount - completed);
}


console.log('init');