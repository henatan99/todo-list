import toDo from './todo';

const listDiv = document.createElement('div');
listDiv.classList.add('listdiv');
listDiv.setAttribute('id', 'listdiv');

const listAppend = (todos) => {
    todos.forEach((todo) => listDiv.appendChild(toDo(todo)));
    return listDiv;
}

export {listAppend as default};