// import './assets/style.css';
// import navBar from './views/navbar';
// import profileImg from './assets/images/photo.jpeg';
// import leftDiv from './views/left.js';
// import middleDiv from './views/middle.js';
// import Calendar from './classes/calendar';
// import calendarEvent from './views/calendarevent.js';
// import getSelectedOption from './views/getoption';
// import date from './views/dateClickEvent';
// import taskFormEvent from './views/taskformevent';
// import Store from './classes/store';
// import addTaskEvent from './views/addTaskEvent';
// import deleteTodo from './views/deleteTodo';

// const container = document.getElementById("container");

// const nav = navBar (profileImg, 'henatan');
// container.appendChild(nav);

// const front  = document.createElement('div');
// front.classList.add('front');
// front.setAttribute('id', 'front');

// let projectsArr = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
// let prioritiesArr = ['Priority1', 'Priority2', 'Priority3', 'Priority4', 'Priority5'];

// front.appendChild(leftDiv());
// front.appendChild(middleDiv(projectsArr, prioritiesArr));

// container.appendChild(front);


// calendarEvent();
// date();
// taskFormEvent();
// deleteTodo();
// addTaskEvent();
// console.log(Store.getTodos());
import taskformDiv from './views1/taskform';
import taskFormEvent from './views1/taskformevent';
import listTodos from './views1/listTodos';
import Store from './classes/store';
import removeTodo from './views1/removeTodoEvent';
import calendarEvent from './views1/calevent';
import listProjects from './views1/left';
import date from './views1/dateClickEvent';

const container = document.getElementById("container");

let projectsArr = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
let prioritiesArr = ['Priority1', 'Priority2', 'Priority3', 'Priority4', 'Priority5'];

container.appendChild(taskformDiv(projectsArr, prioritiesArr));
taskFormEvent();
calendarEvent();
date();



const leftDiv = document.createElement('ul');
leftDiv.classList.add('left');
leftDiv.setAttribute('id', "projects");
container.appendChild(leftDiv);

const projects = ["Project 1", "Project 2", "Project3"];
listProjects(projects);

const todoDiv = document.createElement('div')
todoDiv.setAttribute('id', "todos");
container.appendChild(todoDiv);

listTodos(Store.getTodos());
removeTodo();

console.log(Store.getTodos());