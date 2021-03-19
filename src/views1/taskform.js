import calendarDiv from './calendar';
import fillCells from './fillCells';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const icon1 = '<span class="iconify" data-icon="bx:bxs-category" data-inline="false"></span>';
const icon2 = '<span class="iconify" data-icon="ic:outline-low-priority" data-inline="false"></span>';
// const icon3 = '<span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span>';

const projects = (i=1, projectsArr) => {
    if (i == projectsArr.length) {
        return `<option value="${projectsArr[projectsArr.length-1]}">${projectsArr[projectsArr.length-1]}</option>`;
    } 
    return `<option value="${projectsArr[i]}">${projectsArr[i]}</option>` + projects(i+1, projectsArr);    
}

const projectSelect = createElem('select', 'project-select');

const priorities = (i=1, priorityArr) => {
    if (i == priorityArr.length) return `<option value="${priorityArr[priorityArr.length-1]}">${priorityArr[priorityArr.length-1]}</option>`;
    return `<option value="${priorityArr[i]}">${priorityArr[i]}</option>` + priorities(i+1, priorityArr);    
}

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

// const notebtn = '<button id="project" class="note"> <span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span></button>';
const note = '<textarea id="note" class="note" placeholder="Write todo description"></textarea>'
const notediv = createElem('div', 'notediv');
notediv.innerHTML = note;    


const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task'; 

const taskformDiv = (projectsArr, prioritiesArr) => {
    projectSelect.innerHTML = projects(1, projectsArr);
    prioritySelect.innerHTML = priorities(1, prioritiesArr);

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
}

export { taskformDiv as default };
