import { Project } from "./projectMaker";
import { Todo } from "./todoMaker";

let projectLib = [];

function addProject(title) {
    projectLib.push(new Project(title));
    return;
}

function deleteProject(id) {
    const index = projectLib.findIndex(element => element.id === id);
            
    if (index !== -1) {
        projectLib.splice(index, 1);
    }
    return;
}

function getProjects() {
    const projectLibCopy = [...projectLib];
    return projectLibCopy;
}

function getProjectById(id) {
    let correctProject = projectLib.find((element) => element.id === id);
    
    return correctProject;
}

function setProjects(projectLibCopy) {
    projectLib = [...projectLibCopy];
    return;
}


export {addProject, deleteProject, getProjects, getProjectById, setProjects};