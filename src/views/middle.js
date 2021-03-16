import taskformDiv from './taskform.js';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const middleDiv = (projectsArr, prioritiesArr) => {
    const midDiv = createElem('div', 'middle');
    midDiv.appendChild(taskformDiv(projectsArr, prioritiesArr));
    return midDiv;
}

export { middleDiv as default };