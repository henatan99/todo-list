import './assets/style.css';
import navBar from './views/navbar';
import profileImg from './assets/images/photo.jpeg';
import leftDiv from './views/left.js';
import middleDiv from './views/middle.js';
import Calendar from './classes/calendar';
import calendarEvent from './views/calendarevent.js';
import getSelectedOption from './views/getoption';

const container = document.getElementById("container");

const nav = navBar (profileImg, 'henatan');
container.appendChild(nav);

const front  = document.createElement('div');
front.classList.add('front');
front.setAttribute('id', 'front');

let projectsArr = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
let prioritiesArr = ['Priority1', 'Priority2', 'Priority3', 'Priority4', 'Priority5'];

front.appendChild(leftDiv);
front.appendChild(middleDiv(projectsArr, prioritiesArr));

container.appendChild(front);
calendarEvent();

