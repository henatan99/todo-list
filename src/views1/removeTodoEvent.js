import Store from '../classes/store';

function removeTodo() {
  document.querySelector('#todos').addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.parentElement.classList.contains('del-todo')) {
      const todo = btn.parentElement.parentElement;
      const todoId = todo.getAttribute('value');
      todo.remove();
      Store.removeTodo(parseInt(todoId, 10));
    }
  });
}


export { removeTodo as default };