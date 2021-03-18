import Store from './store';

let todos = Store.getTodos();
const filterByProject = (project) => {
    let todos = todos.map(todo => todo.project = project);
}


// ---------------------------------------------

let todos = Store.getTodos();
let toDate = toDay().split('/');
let todayStr = `${toDate[2]-toDate[1]-toDate[0]}`;

const filterToday = (project) => {
    let todos = todos.map(todo => todo.date = todayStr);
}

// -------------------------------------------

let todos = Store.getTodos();
const filterByPriority = (priority) => {
    let todos = todos.map(todo => todo.priority = priority);
}

