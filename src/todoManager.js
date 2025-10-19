import { Todo } from "./todoMaker";

const todoLib = [];

function addTodo(title, projectId, description, dueDate, priority, status) {
    let todo = new Todo(title, projectId, description, new Date(dueDate), priority, status);
    todoLib.push(todo);
    return todo.id;
}

function deleteTodo(id) {
    const index = todoLib.findIndex(element => element.id === id);
            
    if (index !== -1) {
        todoLib.splice(index, 1);
    }
    return;
}

function changePrio(id, newPriority) {
    const index = todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    todoLib.at(index).priority = newPriority;
    }
    return;
}

function changeStatus(id, newStatus) {
    const index = todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    todoLib.at(index).status = newStatus;
    }
    return;
}

function sortTodos() {
    const todoLibCopy = [...todoLib];
    todoLibCopy.sort( (a, b) => a.dueDate - b.dueDate );
    return todoLibCopy;
}

function getTodos() {
    return sortTodos();
}

function getTodoById(id) {
    let correctTodo = todoLib.find((element) => element.id === id);
    
    return correctTodo;
}

function setTodos(todoLibCopy) {
    todoLib = [...todoLibCopy];
    return;
}

export {addTodo, deleteTodo, changePrio, changeStatus, getTodos, getTodoById, setTodos};