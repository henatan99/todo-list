import appendTodo from './todos';

// const todosDiv = document.createElement('div');
// todosDiv.setAttribute('id', 'todos');

function listTodos(todos) {
    todos.forEach((todoObj) => appendTodo(todoObj, '#todos'));    
}

export {listTodos as default};