import './assets/style.css';
import taskformDiv from './views1/taskform';
import taskFormEvent from './views1/taskformevent';
import listTodos from './views1/listTodos';
import Store from './classes/store';
import removeTodo from './views1/removeTodoEvent';
import calendarEvent from './views1/calevent';
import listProjects from './views1/left';
import date from './views1/dateClickEvent';
import removeProject from './views1/removeProject';
import Filter from './classes/filter';
import fillCells from './views1/fillCells';
import Calendar from './classes/calendar';
import projectEvent from './views1/projectEvent';

const container = document.getElementById('container');
const navBar = document.createElement('navbar');
navBar.classList.add('navbar');
container.appendChild(navBar);

const plusButton = document.createElement('button');
plusButton.type = 'click';
plusButton.classList.add('plusbutton');
plusButton.setAttribute('id', 'plusbutton');
plusButton.textContent = '+';


navBar.appendChild(plusButton);

const todos = Store.getTodos();
const projectsArr = Filter.allProjects(todos);

const prioritiesArr = ['High', 'Medium', 'Low'];

container.addEventListener('click', (e) => {
  const elem = e.target;
  const form = document.querySelector('#taskform');
  if (elem.classList.contains('plusbutton')) {
    if (form != null) {
      form.remove();
      elem.textContent = '+';
    } else {
      container.appendChild(taskformDiv(projectsArr, prioritiesArr));

      taskFormEvent();
      calendarEvent();
      date();
      const calendar = new Calendar(2021, 'January');
      fillCells(calendar.start(), calendar.monthDays(), 'dateDiv');
      elem.textContent = '-';
    }
  }
});

const front = document.createElement('div');
front.classList.add('front');
front.getAttribute('id', 'front');

container.appendChild(front);

const leftDiv = document.createElement('ul');
leftDiv.classList.add('left');
leftDiv.setAttribute('id', 'projects');
front.appendChild(leftDiv);

listProjects(projectsArr);


removeProject();

const middle = document.createElement('div');
middle.classList.add('middle');

const todoDiv = document.createElement('div');
todoDiv.setAttribute('id', 'todos');
middle.appendChild(todoDiv);
front.appendChild(middle);

listTodos(todos);
removeTodo();
projectEvent();
