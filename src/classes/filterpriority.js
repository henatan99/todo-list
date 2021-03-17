import Store from './store';

let todos = Store.getTodos();
const filterByPriority = (priority) => {
    let todos = todos.map(todo => todo.priority = priority);
}

export {filterByPriority as default};