const toDo = (todo) => {
    // [title, description, date, priority, project] = [todo.title, todo.description, todo.date, todo.priority, todo.project];
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    todoDiv.setAttribute('id', 'todoDiv');

    const titleElem = `<h1 class="title">${todo.title}</h1>`;
    
    const descriptionElem = `<p class="description">${todo.description}</p>`;
    const dateElem = `<span class="date">${todo.date}</span>`;
    const priorityElem = `<h2 class="priority">${todo.priority}</h2>`;
    const projectElem = `<h2 class="project">${todo.project}</h2>`;

    const bodyDiv = '<div class="todobody">' + descriptionElem + dateElem + priorityElem + projectElem + '</div>';
    todoDiv.innerHTML = titleElem + bodyDiv;
    return todoDiv;
}

export {toDo as default};
