import taskformDiv from './taskform.js';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const middleDiv = createElem('div', 'middle');
middleDiv.appendChild(taskformDiv);

export { middleDiv as default };