import { Project } from "./projectMaker";
import { Todo } from "./todoMaker";

let projectLib;

if (localStorage.getItem("projectLibSaved") === null) {
    projectLib = [];
    } else {
    projectLib = JSON.parse(localStorage.getItem("projectLibSaved"));
    for (const projObj of projectLib) {
        const projTodoObjs = projObj.todoLib;
        for (const todoObj of projTodoObjs) {
            todoObj.dueDate = new Date(todoObj.dueDate);
        }
    }
    }



function addProject(title) {
    projectLib.push(new Project(title));
    _saveProjectLib();
    return;
}

function deleteProject(id) {
    const index = projectLib.findIndex(element => element.id === id);
            
    if (index !== -1) {
        projectLib.splice(index, 1);
    }
    _saveProjectLib();
    return;
}

function getProjects() {
    const projectLibCopy = [...projectLib];
    for (const element of projectLibCopy) {
    element.todoLib.sort( (a, b) => {
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
    }
    return projectLibCopy;
}

function getProjectById(id) {
    let correctProject = projectLib.find((element) => element.id === id);
    
    return correctProject;
}

function setProjects(projectLibCopy) {
    projectLib = [...projectLibCopy];
    _saveProjectLib();
    return;
}

function _saveProjectLib() {
    localStorage.setItem("projectLibSaved", JSON.stringify(projectLib));
    return;
}

export {addProject, deleteProject, getProjects, getProjectById, setProjects};