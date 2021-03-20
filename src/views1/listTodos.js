import appendTodo from './todos';

function listTodos(todos) {
  todos.forEach((todoObj) => appendTodo(todoObj, '#todos'));
}

export { listTodos as default };