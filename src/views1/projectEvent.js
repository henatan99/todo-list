import Filter from '../classes/filter';
import listTodos from './listTodos';
import Store from '../classes/store';

const todos = Store.getTodos();
function showProject() {
  document.querySelector('#projects').addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList.contains('projecttext')) {
      const tods = document.getElementById('todos');
      tods.innerHTML = '';
      listTodos(Filter.byProject(todos, btn.textContent));
    }
  });
}

export { showProject as default };