import Store from '../classes/store';

const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);    
    elem.setAttribute('id', name);
    return elem;
}

let leftLists = () => {
    let todos = Store.getTodos();
    let projects = todos.map(todo => todo.project);
    let defaults = ['Personal', 'Today', 'Grocery'];
    for (let i=0; i<projects.length; i+=1) {
        defaults.push(projects[i]);
    }
    return defaults;
}

const leftDiv = () => {
   let leftDiv = createElem('div', 'leftDiv');
   let leftUl = createElem('ul', 'leftUl');
   let leftlist = leftLists();
   for(let i=0; i<leftlist.length; i+=1) {
       let listItem = createElem('li', leftlist[i]);
       listItem.classList.add('listitem');
       listItem.innerText = leftlist[i];
       leftUl.appendChild(listItem);
   }
   
   leftDiv.appendChild(leftUl);
   return leftDiv;
}

export {leftDiv as default};
