class Todo {
  constructor(id, title, description, date, priority, project) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.project = project;
    this.date = date;
    this.id = id;
  }
}

export { Todo as default };