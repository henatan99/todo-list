function appendTodo(todoObj, todosId) {
    const todos = document.querySelector(todosId);    

    // creating nodes
    const todo = document.createElement('tr');
    todo.classList.add('todo');
    todo.setAttribute('id', 'todo');
    todo.setAttribute('value', todoObj.id);
  
    // rendering node 'tr'
    todos.appendChild(todo);
  
    // creating nodes 'td'

    const title = document.createElement('td');
    title.classList.add('todo-item');
    title.textContent = todoObj.title;
  
    const description = document.createElement('td');
    description.classList.add('todo-item');
    description.textContent = todoObj.description;
  
    const priority = document.createElement('td');
    priority.classList.add('todo-item');
    priority.textContent = todoObj.priority;
  
    const project = document.createElement('td');
    project.classList.add('todo-item');
    project.textContent = todoObj.project;
  
    const date = document.createElement('td');
    date.classList.add('todo-item');
    date.textContent = todoObj.date;
    
  
    // create the delete button in each book row
    const buttontd = document.createElement('td');
    buttontd.classList.add('del-todo');
  
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.setAttribute('type', 'click');
    buttontd.classList.add('btn');
  
    buttontd.appendChild(button);
    // rendering nodes 'td'
  
    todo.appendChild(title);
    todo.appendChild(description);
    todo.appendChild(priority);
    todo.appendChild(project);
    todo.appendChild(date);
    todo.appendChild(buttontd);
}

export {appendTodo as default};