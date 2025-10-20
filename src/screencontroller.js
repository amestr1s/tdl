import { addTodoToProject, deleteTodoInProj, changeTodoPrioInProj, changeTodoStatusInProj, addProject, deleteProject, getProjects, getTodos } from "./coordinator";

function renderProjects() {
    const projectList = getProjects();
    const sidebar = document.querySelector(".sidebar");
    const projectInput = document.querySelector("#project");
    while (sidebar.hasChildNodes()) {
        sidebar.removeChild(sidebar.firstChild);
    }
    while (projectInput.hasChildNodes()) {
        projectInput.removeChild(projectInput.firstChild);
    }
    const projectUl = document.createElement("ul");
    projectUl.classList.add("projectList");
    for (const projObj of projectList) {
        const project = document.createElement("li");
        project.classList.add(projObj.id);
        project.textContent = `${projObj.title}`;
        const option = document.createElement("option");
        option.textContent = `${projObj.title}`;
        option.value = projObj.id;
        projectInput.appendChild(option);
        const projectTodoUl = document.createElement("ul");
        const projectTodoList = projObj.todoLib;
        for (const todoObj of projectTodoList) {
            const todo = document.createElement("li");
            todo.classList.add(todoObj.id);
            todo.textContent = `${todoObj.title} Due by: ${todoObj.dueDate.toLocaleDateString()} Status: ${todoObj.status} `;
            projectTodoUl.appendChild(todo);

        }
        project.appendChild(projectTodoUl);
        projectUl.appendChild(project);
    }
    sidebar.appendChild(projectUl);
    return;
}

function setupTodoForm() {
    const todoCreator = document.querySelector("#todoCreator");
    const todoDialog = document.querySelector("#todoDialog");
    const confirmTodoBtn = document.querySelector("#confirmTodoBtn");
    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const dueDateInput = document.querySelector("#dueDate");
    const cancelTodoBtn = document.querySelector("#cancelTodoBtn");
    const todoForm = document.querySelector("#todoForm");
    const priorityInput = document.querySelector("#priority");
    const projectInput = document.querySelector("#project");

    todoCreator.addEventListener("click", () => {
        todoDialog.showModal();
    });

    cancelTodoBtn.addEventListener("click", (event) => {
  
        todoDialog.close();
        todoForm.reset();
        renderProjects();
    });

    confirmTodoBtn.addEventListener("click", (event) => {
  
        event.preventDefault();
  
        addTodoToProject(titleInput.value, projectInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, "Undone");
        renderProjects();
        todoDialog.close(); 
        todoForm.reset();
        
});
}



function init() {
    const projectList = getProjects();
    if (projectList.length === 0) {
        addProject("default");
    } 
    renderProjects();
    setupTodoForm();
    return;
}

export {init};