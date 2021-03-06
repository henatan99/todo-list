import calendarDiv from './calendar';

const createElem = (tag, name) => {
  const elem = document.createElement(tag);
  elem.classList.add(name);
  elem.setAttribute('id', name);
  return elem;
};

const projects = (i = 1, projectsArr) => {
  if (i === projectsArr.length - 1) {
    return `<option value="${projectsArr[projectsArr.length - 1]}">${projectsArr[projectsArr.length - 1]}</option>`;
  }
  return `<option value="${projectsArr[i]}">${projectsArr[i]}</option>${projects(i + 1, projectsArr)}`;
};

const projectSelect = createElem('select', 'project-select');

const priorities = (i = 1, priorityArr) => {
  if (i === priorityArr.length - 1) return `<option value="${priorityArr[priorityArr.length - 1]}">${priorityArr[priorityArr.length - 1]}</option>`;
  return `<option value="${priorityArr[i]}">${priorityArr[i]}</option>${priorities(i + 1, priorityArr)}`;
};

const prioritySelect = createElem('select', 'priority-select');

const titleElem = document.createElement('div');
titleElem.classList.add('titleElem');
titleElem.setAttribute('id', 'titleElem');

titleElem.innerHTML = '<input type="text" id="title" name="title" placeholder="Title"><br>';


const newProject = document.createElement('input');
newProject.classList.add('newproject');
newProject.setAttribute('id', 'newproject');
newProject.setAttribute('type', 'text');
newProject.placeholder = 'New Project';

const note = '<textarea id="note" class="note" placeholder="Write todo description"></textarea>';
const notediv = createElem('div', 'notediv');
notediv.innerHTML = note;


const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task';

const taskformDiv = (projectsArr, prioritiesArr) => {
  projectSelect.innerHTML = projects(0, projectsArr);
  prioritySelect.innerHTML = priorities(0, prioritiesArr);

  const taskformDiv = createElem('div', 'taskform');
  const formWrapper = createElem('div', 'formwrapper');
  taskformDiv.appendChild(formWrapper);

  formWrapper.appendChild(titleElem);
  formWrapper.appendChild(projectSelect);
  formWrapper.appendChild(newProject);
  formWrapper.appendChild(prioritySelect);
  formWrapper.appendChild(calendarDiv());
  formWrapper.appendChild(notediv);


  taskformDiv.appendChild(addTask);


  return taskformDiv;
};

export { taskformDiv as default };
