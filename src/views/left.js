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


const projectList = (projects = []) => {
    const defaultProjects = ['Today', 'Tomorrow', 'This Week', 'Home', 'Personal', 'Work', 'Fitness'];
    defaultProjects.push(projects);
    let radioItems;
    for (let i=0; i<defaultProjects.length; i+=1) {
        radioItems += radioItem(`radio${i+1}`, 'projects', `${defaultProjects[i]}`, `${defaultProjects[i]}`);
    }
    return radioItems;
}


radioFrom.innerHTML = projectList();
leftDiv.appendChild(radioFrom);

export {leftDiv as default};
