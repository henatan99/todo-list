import './assets/style.css';
import navBar from './views/navbar';
import profileImg from './assets/images/photo.jpeg';
import leftDiv from './views/left.js';
import taskformDiv from './views/taskfrom.js';

const container = document.getElementById("container");

const nav = navBar (profileImg, 'henatan');
container.appendChild(nav);
container.appendChild(leftDiv);
container.appendChild(taskformDiv);