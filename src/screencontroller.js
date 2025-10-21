import { addTodoToProject, deleteTodoInProj, changeTodoPrioInProj, changeTodoStatusInProj, addProject, deleteProject, getProjects, getProjectById, getTodos } from "./coordinator";

const todoDetailsDialog = document.querySelector("#todoDetailsDialog");
const titleP = document.querySelector(".title");
const descriptionP = document.querySelector(".description");
const dueDateP = document.querySelector(".dueDate");
const projectNameP = document.querySelector(".projectName");
const closeTodoProjectBtn = document.querySelector("#closeTodoProjectBtn");

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
        // projectDelBtn.textContent = "Delete Project";
        projectDelBtn.addEventListener("click", (event) => {
            deleteProject(projObj.id);
            renderProjects();
            renderContent();
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
            const todoInfoDiv = document.createElement("div");
            todoInfoDiv.addEventListener("click", (event) => {
                titleP.textContent = `Title: ${todoObj.title}`;
                descriptionP.textContent = `Description: ${todoObj.description}`;
                dueDateP.textContent = `Due by: ${todoObj.dueDate.toLocaleDateString()}`;
                projectNameP.textContent = `Belongs to: ${projObj.title}`;
                todoDetailsDialog.showModal();
            })
            todoInfoDiv.classList.add(todoObj.priority);
            const todoInfoTitle = document.createElement("p")
            todoInfoTitle.textContent = `${todoObj.title}`;
            todoInfoDiv.appendChild(todoInfoTitle);
            const todoInfoDueDate = document.createElement("p")
            todoInfoDueDate.textContent = `Due: ${todoObj.dueDate.toLocaleDateString()}`;
            todoInfoDiv.appendChild(todoInfoDueDate);
            const todoInfoStatus = document.createElement("p")
            todoInfoStatus.textContent = `Status: ${todoObj.status}`;
            todoInfoDiv.appendChild(todoInfoStatus);
            todoDiv.appendChild(todoInfoDiv);
            const todoControls = document.createElement("div");
            todoControls.classList.add("todoControls")
            const changePrioSel = document.createElement("select");
            const critical = document.createElement("option");
            critical.value = "critical";
            critical.textContent = "Critical";
            changePrioSel.appendChild(critical);
            const high = document.createElement("option");
            high.value = "high";
            high.textContent = "High";
            changePrioSel.appendChild(high);
            const moderate = document.createElement("option");
            moderate.value = "moderate";
            moderate.textContent = "Moderate";
            changePrioSel.appendChild(moderate);
            const low = document.createElement("option");
            low.value = "low";
            low.textContent = "Low";
            changePrioSel.appendChild(low);
            changePrioSel.value = todoObj.priority;
            changePrioSel.addEventListener("change", (event) => {
                changeTodoPrioInProj(todoObj.projectId, todoObj.id, event.target.value);
                renderProjects();
                renderContent();
            });
            todoControls.appendChild(changePrioSel);
            const statusChkbx = document.createElement("input");
            statusChkbx.type = "checkbox";
            if (todoObj.status === "Undone") {
                statusChkbx.checked = false;
                todoInfoDiv.classList.remove("strike");
            } else if (todoObj.status === "Done") {
                statusChkbx.checked = true;
                todoInfoDiv.classList.add("strike");
            }
            statusChkbx.addEventListener("change", (event) => {
                if (event.target.checked === false) {
                    changeTodoStatusInProj(todoObj.projectId, todoObj.id, "Undone");
                    statusChkbx.checked = false;
                    renderProjects();
                    renderContent();
                } else if (event.target.checked === true) {
                    changeTodoStatusInProj(todoObj.projectId, todoObj.id, "Done");
                    statusChkbx.checked = true;
                    renderProjects();
                    renderContent();
                }
            });
            todoControls.appendChild(statusChkbx);
            const delTodoBtn = document.createElement("button");
            // delTodoBtn.textContent = "Delete Todo";
            delTodoBtn.addEventListener("click", (event) => {
                deleteTodoInProj(todoObj.projectId, todoObj.id);
                renderProjects();
                renderContent();
            })
            todoControls.appendChild(delTodoBtn);
            todoDiv.appendChild(todoControls);
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

function renderContent() {
    const content = document.querySelector(".content");
    const todoList = getTodos();
    while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
    }
    for (const todoObj of todoList) {
        const correctProject = getProjectById(todoObj.projectId);
        const mainTodo = document.createElement("div");
        mainTodo.classList.add("mainTodo");
        mainTodo.addEventListener("click", (event) => {
            titleP.textContent = `Title: ${todoObj.title}`;
            descriptionP.textContent = `Description: ${todoObj.description}`;
            dueDateP.textContent = `Due by: ${todoObj.dueDate.toLocaleDateString()}`;
            projectNameP.textContent = `Belongs to: ${correctProject.title}`;
            todoDetailsDialog.showModal();
        })
        if (todoObj.status === "Done") {
            mainTodo.classList.add("strike");
        } else if (todoObj.status === "Undone") {
            mainTodo.classList.remove("strike");
        }
        const mainTodoTitle = document.createElement("h3");
        mainTodoTitle.classList.add(todoObj.priority);
        mainTodoTitle.textContent = todoObj.title;
        mainTodo.appendChild(mainTodoTitle);
        const mainTodoDueDate = document.createElement("h4");
        mainTodoDueDate.classList.add(todoObj.priority);
        mainTodoDueDate.textContent = todoObj.dueDate.toLocaleDateString();
        mainTodo.appendChild(mainTodoDueDate);
        content.appendChild(mainTodo);
    }
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
        renderContent();
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
        renderContent();
        projectDialog.close(); 
        projectForm.reset();
        
});
}

function setupTodoDetailsModal() {
    closeTodoProjectBtn.addEventListener("click", (event) => {
        todoDetailsDialog.close();
        titleP.textContent = "";
        descriptionP.textContent = "";
        dueDateP.textContent = "";
        projectNameP.textContent = "";
    })
}

function setupStorageDeletion() {
    const clearStorageBtn = document.querySelector("#clearStorageBtn");
    clearStorageBtn.addEventListener("click", (event) => {
        localStorage.clear();
        location.reload();
    })
    return;
}

function init() {
    const projectList = getProjects();
    if (projectList.length === 0) {
        addProject("default");
    } 
    renderProjects();
    renderContent();
    setupTodoForm();
    setupProjectForm();
    setupTodoDetailsModal();
    setupStorageDeletion();
    return;
}

export {init};