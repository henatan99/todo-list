class Store {
  static getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
  }

  static addTodo(todo) {
    const todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static removeTodo(id) {
    const todos = Store.getTodos();
    todos.forEach((todo, index) => {
      if (todo.id === id) {
        todos.splice(index, 1);
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  static editTodo(id, title, description, date, priority, project) {
    const todos = Store.getTodos();
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.priority = priority;
        todo.project = project;
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

export { Store as default };