import Filter from '../classes/filter';
import listTodos from './listTodos';


function showProject() {
  document.querySelector('#projects').addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList.contains('projecttext')) {
      const tods = document.getElementById('todos');
      tods.innerHTML = '';
      listTodos(Filter.byProject(btn.textContent));
    }
  });
}

export { showProject as default };