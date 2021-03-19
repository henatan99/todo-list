import Store from './store';

class Filter {  
    static allProjects() {
        let todos = Store.getTodos();
        let allProjects = todos.map(todo => todo.project);
        return allProjects;
    }

    static byProject(project) {
        let todos = Store.getTodos();
        let todosOfProject = todos.filter(todo => todo.project == project);
        return todosOfProject;
    }    

    static byToday(project) {
        let todos = Store.getTodos();
        let toDate = toDay().split('/');
        let todayStr = `${toDate[2]-toDate[1]-toDate[0]}`;
        let todosOfToday = todos.filter(todo => todo.date == todayStr);
        return todosOfToday;
    }   

    static byPriority (priority) {
        let todos = Store.getTodos();
        let todosOfPriority = todos.map(todo => todo.priority == priority);
        return todosOfPriority;
    }
}

export {Filter as default};




