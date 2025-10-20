import { addTodoToProject, deleteTodoInProj, changeTodoPrioInProj, changeTodoStatusInProj, addProject, deleteProject, getProjects, getTodos } from "./coordinator";

function renderProjects() {
    const projectList = getProjects();
    const sidebarContainer = document.querySelector(".sidebarContainer");
    const projectInput = document.querySelector("#project");
    while (sidebarContainer.hasChildNodes()) {
        sidebarContainer.removeChild(sidebarContainer.firstChild);
    }
    while (projectInput.hasChildNodes()) {
        projectInput.removeChild(projectInput.firstChild);
    }
    const projectUl = document.createElement("ul");
    projectUl.classList.add("projectList");
    for (const projObj of projectList) {
        const project = document.createElement("li");
        project.classList.add(projObj.id);
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("projectContainer");
        const projectP = document.createElement("p");
        projectP.textContent = `${projObj.title}`;
        projectDiv.appendChild(projectP);
        const projectDelBtn = document.createElement("button");
        projectDelBtn.textContent = "Delete Project";
        projectDelBtn.addEventListener("click", (event) => {
            deleteProject(projObj.id);
            renderProjects();
        });
        projectDiv.appendChild(projectDelBtn);
        const option = document.createElement("option");
        option.textContent = `${projObj.title}`;
        option.value = projObj.id;
        projectInput.appendChild(option);
        const projectTodoUl = document.createElement("ul");
        const projectTodoList = projObj.todoLib;
        for (const todoObj of projectTodoList) {
            const todo = document.createElement("li");
            todo.classList.add(todoObj.id);
            const todoDiv = document.createElement("div");
            const todoP = document.createElement("p");
            todoP.classList.add(todoObj.priority);
            todoP.textContent = `${todoObj.title} due by: ${todoObj.dueDate.toLocaleDateString()} Status: ${todoObj.status} `;
            todoDiv.appendChild(todoP);
            const changePrioSel = document.createElement("select");
            const critical = document.createElement("option");
            critical.value = "1";
            critical.textContent = "Critical";
            changePrioSel.appendChild(critical);
            const high = document.createElement("option");
            high.value = "2";
            high.textContent = "High";
            changePrioSel.appendChild(high);
            const moderate = document.createElement("option");
            moderate.value = "3";
            moderate.textContent = "Moderate";
            changePrioSel.appendChild(moderate);
            const low = document.createElement("option");
            low.value = "4";
            low.textContent = "Low";
            changePrioSel.value = todoObj.priority;
            changePrioSel.appendChild(low);
            todoDiv.appendChild(changePrioSel);
            todo.appendChild(todoDiv);
            projectTodoUl.appendChild(todo);
        }
        project.appendChild(projectDiv);
        project.appendChild(projectTodoUl);
        projectUl.appendChild(project);
    }
    sidebarContainer.appendChild(projectUl);
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

function setupProjectForm() {
    const projectCreator = document.querySelector("#projectCreator");
    const projectDialog = document.querySelector("#projectDialog");
    const confirmProjectBtn = document.querySelector("#confirmProjectBtn");
    const titleInput = document.querySelector("#projectTitle");
    const cancelProjectBtn = document.querySelector("#cancelProjectBtn");
    const projectForm = document.querySelector("#projectForm");
    

    projectCreator.addEventListener("click", () => {
        projectDialog.showModal();
    });

    cancelProjectBtn.addEventListener("click", (event) => {
  
        projectDialog.close();
        projectForm.reset();
        renderProjects();
    });

    confirmProjectBtn.addEventListener("click", (event) => {
  
        event.preventDefault();
  
        addProject(titleInput.value);
        renderProjects();
        projectDialog.close(); 
        projectForm.reset();
        
});
}


function init() {
    const projectList = getProjects();
    if (projectList.length === 0) {
        addProject("default");
    } 
    renderProjects();
    setupTodoForm();
    setupProjectForm();
    return;
}

export {init};