import Store from './store';
import toDay from './timenow'; 

let todos = Store.getTodos();
let toDate = toDay().split('/');
let todayStr = `${toDate[2]-toDate[1]-toDate[0]}`;

const filterToday = (project) => {
    let todos = todos.map(todo => todo.date = todayStr);
}

export {filterToday as default};