const toDo = (todo) => {
    // [title, description, date, priority, project] = [todo.title, todo.description, todo.date, todo.priority, todo.project];
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    todoDiv.setAttribute('id', 'todoDiv');

    const titleElem = `<h1 class="title">${todo.title}</h1>`;
    const tickMark = `<button class="tickmark" id="tickmark"><span class="iconify" id = "iconify-tick" data-icon="subway:tick" data-inline="false"></span></button>`;
    const descriptionElem = `<p class="description">${todo.description}</p>`;
    const dateElem = `<h2 class="date">${todo.date}</h2>`;
    const priorityElem = `<h2 class="priorityl">${todo.priority}</h2>`;
    const projectElem = `<h2 class="projectl">${todo.project}</h2>`;

    const bodyDiv = '<div class="todobody">' + tickMark + descriptionElem + dateElem + priorityElem + projectElem + '</div>';
    todoDiv.innerHTML = titleElem + bodyDiv;
    return todoDiv;
}

export {toDo as default};
