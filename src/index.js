import './assets/style.css';
import navBar from './views/navbar';
import profileImg from './assets/images/photo.jpeg';
import leftDiv from './views/left.js';
import middleDiv from './views/middle.js';

const container = document.getElementById("container");

const nav = navBar (profileImg, 'henatan');
container.appendChild(nav);

const front  = document.createElement('div');
front.classList.add('front');
front.setAttribute('id', 'front');

front.appendChild(leftDiv);
front.appendChild(middleDiv);

container.appendChild(front);
