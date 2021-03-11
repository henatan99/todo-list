import './assets/style.css';
import navBar from './views/navbar';
import profileImg from './assets/images/photo.jpeg';

const container = document.getElementById("container");

const nav = navBar (profileImg, 'henatan');
container.appendChild(nav);

