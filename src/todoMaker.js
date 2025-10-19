class Todo {
    constructor(title, projectId, description, dueDate, priority, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.projectId = projectId;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }
}

export { Todo };