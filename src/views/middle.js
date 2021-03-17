import taskformDiv from './taskform.js';
import listAppend from './todolist';
import Store from '../classes/store';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const middleDiv = (projectsArr, prioritiesArr) => {
    const midDiv = createElem('div', 'middle');
    midDiv.appendChild(taskformDiv(projectsArr, prioritiesArr));
    midDiv.appendChild(listAppend(Store.getTodos()));
    return midDiv;
}

export { middleDiv as default };