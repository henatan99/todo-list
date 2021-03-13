import calendarDiv from './calendar';

const taskformDiv = document.createElement('div');
taskformDiv.classList.add('taskform');
taskformDiv.setAttribute('id', 'taskform');

const defProjects = '<option value="home">Home</option><option value="personal">Personal</option>' +
'<option value="work">Work</option><option value="fitness">Fitness</option><option value="Shopping">Home</option>';
let projects = defProjects;
const addProjects = (projects, project) => {
    projects += project;
}

const priorities = (i=1, max) => {
    if (i == max) return `<option value="priority${max}">Priority ${max}</option>`;
    return `<option value="priority${i}">Priority ${i}</option>` + priorities(i+1, max);    
}

const title = '<input type="text" id="title" name="title" ><br>';

const projectSelect = '<select name="project-select" id="project-select">' + projects + '</select>'
const projectbtn = '<button id ="projectbtn" class="projectbtn"> <span class="iconify" data-icon="bx:bxs-category" data-inline="false"></span> </button>';
const project = `<div id="project" class="project">${projectbtn}${projectSelect}</div>`;

let myPriorities = priorities(1, 10);
const prioritySelect = '<select name="priority-select" id="priority-select">' + myPriorities + '</select>';
const prioritybtn = '<button id="prioritybtn" class="priorityrtn"> <span class="iconify" data-icon="ic:outline-low-priority" data-inline="false"></span> </button>';

const priority = `<div id="priority" class="priority">${prioritybtn}${prioritySelect}</div>`;


const schedulebtn = '<button id="schedulebtn" class="schedulebtn">Schedule</button>';
const schedule = `<div id="schedule" class="schedule">${schedulebtn}${calendarDiv}<div>`;

const notebtn = '<button id="project" class="note"> <span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span></button>';

const addTask = '<button id="task-btn" class="tsk-btn">Add Task</button>';
const note = '<textfield id="note" class="note" placeholder="Write todo description"></textfield>'

taskformDiv.innerHTML = title + schedule + note + project + priority + addTask;

export { taskformDiv as default };
