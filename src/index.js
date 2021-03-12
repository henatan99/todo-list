import './assets/style.css';
import navBar from './views/navbar';
import profileImg from './assets/images/photo.jpeg';
import leftDiv from './views/left.js';

const container = document.getElementById("container");

const nav = navBar (profileImg, 'henatan');
container.appendChild(nav);
container.appendChild(leftDiv);
