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
        return `<option value="project${projectsArr.length}">${projectsArr[projectsArr.length-1]}</option>` + '<option id="addproject">Add Project</option>';
    } 
    return `<option value="project${i}">Project ${projectsArr[i]}</option>` + projects(i+1, projectsArr);    
}

const priorities = (i=1, priorityArr) => {
    if (i == priorityArr.length) return `<option value="priority${priorityArr.length}">Priority ${priorityArr[priorityArr.length-1]}</option>`;
    return `<option value="priority${i}">${priorityArr[i]}</option>` + priorities(i+1, priorityArr);    
}

const titleElem = document.createElement('div');
titleElem.classList.add('titleElem');
titleElem.setAttribute('id', 'titleElem');

titleElem.innerHTML = '<input type="text" id="title" name="title" placeholder="Title"><br>';

const selectDiv = (oTag, iTag, name, innerT, innerIcon='') => {
    const select = createElem(`${oTag}`, `${oTag}-${name}`);
    select.innerHTML = innerT;
    const selectbtn = createElem(`${iTag}`, `${iTag}-${name}`);
    selectbtn.innerHTML = innerIcon; 
    const selectDiv = createElem('div', `${name}`);
    selectDiv.appendChild(selectbtn);
    selectDiv.appendChild(select);
    return selectDiv;
}

const projectSelect = (projectsArr) => selectDiv('select', 'button', 'project', projects(1, projectsArr), icon1);
const prioritySelect = (prioritiesArr) => selectDiv('select', 'button', 'priority', priorities(1, prioritiesArr), icon2);
const schedule = (innerT) => selectDiv('div', 'button', 'schedule', innerT, 'Schedule');

const noteDiv = () => {
    const notebtn = '<button id="project" class="note"> <span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span></button>';
    const note = '<textarea id="note" class="note" placeholder="Write todo description"></textarea>'
    const notediv = createElem('div', 'notediv');
    notediv.innerHTML = notebtn + note;    
    return notediv;
}

const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task'; 

const taskformDiv = (projectsArr, prioritiesArr) => {
    const taskformDiv = createElem('div', 'taskform');
    const formWrapper = createElem('div', 'formwrapper');
    taskformDiv.appendChild(formWrapper);
    
    formWrapper.appendChild(titleElem);
    formWrapper.appendChild(projectSelect(projectsArr));
    formWrapper.appendChild(prioritySelect(prioritiesArr));
    formWrapper.appendChild(schedule(calendarDiv().innerHTML));
    formWrapper.appendChild(noteDiv());

    
    taskformDiv.appendChild(addTask);    
    return taskformDiv;
}

export { taskformDiv as default };
