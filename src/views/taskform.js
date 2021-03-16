import calendarDiv from './calendar';

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
    if (i == projectsArr.length) return `<option value="project${projectsArr.length}">Project ${projectsArr.length}</option>`;
    return `<option value="project${i}">Project ${i}</option>` + projects(i+1, projectsArr);    
}

const priorities = (i=1, priorityArr) => {
    if (i == priorityArr.length) return `<option value="priority${priorityArr.length}">Priority ${priorityArr.length}</option>`;
    return `<option value="priority${i}">Priority ${i}</option>` + priorities(i+1, priorityArr);    
}

const title = '<input type="text" id="title" name="title" ><br>';

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
const schedule = (innerT) => selectDiv('div', 'button', 'schedule', innerT);

const noteDiv = () => {
    const notebtn = '<button id="project" class="note"> <span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span></button>';
    const note = '<textfield id="note" class="note" placeholder="Write todo description"></textfield>'
    const notediv = createElem('div', 'notediv');
    notediv.innerHTML = notebtn + note;
    return notediv;
}

const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task'; 

const taskformDiv = (projectsArr, prioritiesArr, start, len) => {
    const taskformDiv = createElem('div', 'taskform'); 
    taskformDiv.appendChild(projectSelect(projectsArr));
    taskformDiv.appendChild(prioritySelect(prioritiesArr));
    taskformDiv.appendChild(schedule(calendarDiv(start, len).innerHTML));
    taskformDiv.appendChild(noteDiv());
    taskformDiv.appendChild(addTask);
    return taskformDiv;
}

export { taskformDiv as default };
