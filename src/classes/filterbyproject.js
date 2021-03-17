import Store from './store';

let todos = Store.getTodos();
const filterByProject = (project) => {
    let todos = todos.map(todo => todo.project = project);
}

export {filterByProject as default};