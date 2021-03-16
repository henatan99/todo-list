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

    static removeTodo(priority) {
        const todos = Store.getTodos();
        todos.forEach((todo, index) => {
          if (todo.priority === priority) {
            todos.splice(index, 1);
          }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static editTodo(priority, title, project, description, date) {
        const books = Store.getBooks();
        books.forEach((todo) => {
          if (todo.priority === priority) {
            todo.title = title;
            todo.project = project;
            todo.description = description;
            todo.date = date;
            todo.priority = priority;
          }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }


}