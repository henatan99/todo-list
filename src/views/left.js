const createElem = (tag) => {
    let elem = document.createElement(tag);
    elem.classList.add(tag);
    elem.setAttribute('id', tag);
    return elem;
}

const radioInput = (id, name, value) => `<input type="radio" id=${id} name=${name} value=${value}>`;
const radioLabel = (name, text) => `<label for=${name}>${text}</label><br></br>`;
const radioItem = (id, name, value, text) => radioInput(id, name, value) + radioLabel(name, text) ; 

const leftDiv = createElem('div');
const menuUl = createElem('ul');
const ListItemLi = createElem('li');

let radioItem1 = radioItem('radio1', 'radio1', 'classroom', 'Classroom');
ListItemLi.innerHTML = radioItem1;
menuUl.appendChild(ListItemLi);
leftDiv.appendChild(menuUl);

export {leftDiv as default};
