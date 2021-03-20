import getSelectedOption from './getoption';
import Todo from '../classes/todo';
import Store from '../classes/store';
import listTodos from './listTodos';

const taskFormEvent = () => {
  const taskForm = document.getElementById('taskform');
  const title = document.querySelector('#title');
  const selectProject = document.querySelector('#project-select');
  const newProject = document.querySelector('#newproject');
  const selectPriority = document.querySelector('#priority-select');
  const dateDiv = document.getElementById('dateDiv');
  const noteText = document.getElementById('note');

  const taskObj = new Todo();

  taskForm.addEventListener('click', (event) => {
    const elem = event.target;
    if (elem.classList.contains('tsk-btn')) {
      const titl = title.value;
      const date = dateDiv.value;
      const desc = noteText.value;
      const project = getSelectedOption(selectProject).value;
      const priority = getSelectedOption(selectPriority).value;
      taskObj.title = titl;
      taskObj.description = desc;
      taskObj.project = newProject.value === '' ? project : newProject.value;
      taskObj.priority = priority;
      taskObj.date = date;
      const todos = Store.getTodos();
      const id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
      taskObj.id = id;
      Store.addTodo(taskObj);

      const tods = document.getElementById('todos');
      tods.innerHTML = '';

      listTodos(Store.getTodos());
      taskForm.remove();
      document.querySelector('#plusbutton').textContent = '+';
    }
  });
};

export { taskFormEvent as default };