import {addProject, deleteProject, getProjects, getProjectById, setProjects} from "./projectManager";
import {addTodo, deleteTodo, changePrio, changeStatus, getTodos, getTodoById, setTodos} from "./todoManager";

function addTodoToProject(title, projectId, description, dueDate, priority, status) {
    const projectLibCopy = getProjects();
    let todo = addTodo(title, projectId, description, dueDate, priority, status);
    let correctTodo = getTodoById(todo);
    const index = projectLibCopy.findIndex(element => element.id === projectId);
        if (index !== -1) {
            if (correctTodo === undefined || correctTodo === null){
                return;
            }
            projectLibCopy[index].todoLib.push(correctTodo);
            setProjects(projectLibCopy);
        }
    return;
}

function changeTodoPrioInProj(projectId, id, newPriority) {
    changePrio(id, newPriority);
    let correctProject = getProjectById(projectId);
    const index = correctProject.todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    correctProject.todoLib.at(index).priority = newPriority;
    }
    return;
}

function changeTodoStatusInProj(projectId, id, newStatus) {
    changeStatus(id, newStatus);
    let correctProject = getProjectById(projectId);
    const index = correctProject.todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    correctProject.todoLib.at(index).status = newStatus;
    }
    return;
}

function deleteTodoInProj(projectId, id) {
    deleteTodo(id);
    let correctProject = getProjectById(projectId);
    const index = correctProject.todoLib.findIndex(element => element.id === id);
    if (index !== -1) {
    correctProject.todoLib.splice(index, 1);
    }
    return;
}

export {addTodoToProject, changeTodoPrioInProj, changeTodoStatusInProj, deleteTodoInProj};