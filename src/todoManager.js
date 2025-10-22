import { Todo } from "./todoMaker";

let todoLib;

if (localStorage.getItem("todoLibSaved") === null) {
    todoLib = [];
    } else {
    todoLib = JSON.parse(localStorage.getItem("todoLibSaved"));
    for (const todoObj of todoLib) {
        todoObj.dueDate = new Date(todoObj.dueDate);
        }
    }
    

function addTodo(title, projectId, description, dueDate, priority, status) {
    let todo = new Todo(title, projectId, description, new Date(dueDate), priority, status);
    todoLib.push(todo);
    _saveTodoLib();
    return todo.id;
}

function deleteTodo(id) {
    const index = todoLib.findIndex(element => element.id === id);
            
    if (index !== -1) {
        todoLib.splice(index, 1);
    }
    _saveTodoLib();
    return;
}

function changePrio(id, newPriority) {
    const index = todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    todoLib.at(index).priority = newPriority;
    }
    _saveTodoLib();
    return;
}

function changeStatus(id, newStatus) {
    const index = todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    todoLib.at(index).status = newStatus;
    }
    _saveTodoLib();
    return;
}

function sortTodos() {
    const todoLibCopy = [...todoLib];
    todoLibCopy.sort( (a, b) => {
    // Rule 1: Handle "Done" items
    if (a.status === "Done" && b.status !== "Done") {
        return 1; // a comes after b
    }
    if (a.status !== "Done" && b.status === "Done") {
        return -1; // a comes before b
    }

    // Rule 2: If statuses are the same (both Done or both Undone),
    // sort by due date (earliest first)
    return a.dueDate - b.dueDate;
});
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
    _saveTodoLib();
    return;
}

function _saveTodoLib() {
    localStorage.setItem("todoLibSaved", JSON.stringify(todoLib));
    return;
}


export {addTodo, deleteTodo, changePrio, changeStatus, getTodos, getTodoById, setTodos};