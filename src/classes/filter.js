import Store from './store';

class Filter {    
    static byProject(project) {
        let todos = Store.getTodos();
        let todos = todos.map(todo => todo.project = project);
    }    

    static byToday(project) {
        let todos = Store.getTodos();
        let toDate = toDay().split('/');
        let todayStr = `${toDate[2]-toDate[1]-toDate[0]}`;
        let todos = todos.map(todo => todo.date = todayStr);
    }   

    static byPriority (priority) {
        let todos = Store.getTodos();
        let todos = todos.map(todo => todo.priority = priority);
    }
}

export {Filter as default};




