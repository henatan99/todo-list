let todosElem = document.querySelector('#todos');
function removeTodos(todos = todosElem) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export {removeTodos as default};