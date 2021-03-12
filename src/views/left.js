const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const radioInput = (id, name, value) => `<input type="radio" id=${id} name=${name} value=${value}>`;
const radioLabel = (name, text) => `<label for=${name}>${text}</label><br></br>`;
const radioItem = (id, name, value, text) => radioInput(id, name, value) + radioLabel(name, text) ; 

const leftDiv = createElem('div', 'left');
const menuUl = createElem('ul', 'menu');
const ListItemLi = createElem('li', 'menu-list');

let radioItem1 = radioItem('radio1', 'radio1', 'classroom', 'Classroom');
ListItemLi.innerHTML = radioItem1;
menuUl.appendChild(ListItemLi);
leftDiv.appendChild(menuUl);

export {leftDiv as default};
