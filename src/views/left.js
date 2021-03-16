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
const radioFrom = createElem('form', 'radioform');


const projectList = (projects) => {    
    
    let radioItems;
    for (let i=0; i<projects.length; i+=1) {
        radioItems += radioItem(`radio${i+1}`, 'projects', `${projects[i]}`, `${projects[i]}`);
    }
    return radioItems;
}

const defaultProjects = ['Today', 'Tomorrow', 'This Week', 'Home', 'Personal', 'Work', 'Fitness'];
radioFrom.innerHTML = projectList(defaultProjects);
leftDiv.appendChild(radioFrom);

export {leftDiv as default};
