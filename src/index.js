import './assets/style.css';
import navBar from './views/navbar';

const container = document.getElementById("container");

const nav = navBar ('photo.jpeg', 'henatan');
container.appendChild(nav);

