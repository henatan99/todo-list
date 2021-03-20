import Store from '../classes/store';
import Filter from '../classes/filter';

function removeProject() {
  document.querySelector('#projects').addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList.contains('project-btn')) {
      const project = btn.parentElement;
      const projectName = project.childNodes[0].textContent;
      const projectTodos = Filter.byProject(projectName);
      for (let i = 0; i < projectTodos.length; i += 1) {
        Store.removeTodo(projectTodos[i].id);
      }
      project.remove();
    }
  });
}


export { removeProject as default };