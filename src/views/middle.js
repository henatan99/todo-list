import taskformDiv from './taskform.js';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const middleDiv = (projectsArr, prioritiesArr, start, len) => {
    const midDiv = createElem('div', 'middle');
    midDiv.appendChild(taskformDiv(projectsArr, prioritiesArr, start, len));
    return midDiv;
}

export { middleDiv as default };