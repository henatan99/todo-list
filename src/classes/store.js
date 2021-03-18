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
          if (todo.id == id) {
            todos.splice(index, 1);
          }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static editTodo(title, description, date, priority, project) {
        const todos = Store.getBooks();
        books.forEach((todo) => {
          if (todo.priority === priority) {
            todo.title = title;
            todo.description = description;
            todo.date = date;         
            todo.priority = priority;
            todo.project = project; 
          }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    static clearTodo() {
      let todos = Store.getTodos();
    }
}

export {Store as default};