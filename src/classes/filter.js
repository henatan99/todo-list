import Store from './store';
import toDay from './timenow';

class Filter {
  static allProjects() {
    const todos = Store.getTodos();
    const allProjects = todos.map(todo => todo.project);
    allProjects.push('Home');
    allProjects.push('Work');
    allProjects.push('Exercise');
    const unqPrjcts = allProjects.filter((item, i, allProjects) => allProjects.indexOf(item) === i);
    return unqPrjcts;
  }

  static byProject(project) {
    const todos = Store.getTodos();
    const todosOfProject = todos.filter(todo => todo.project === project);
    return todosOfProject;
  }

  static byToday() {
    const todos = Store.getTodos();
    const toDate = toDay().split('/');
    const todayStr = `${toDate[2] - toDate[1] - toDate[0]}`;
    const todosOfToday = todos.filter(todo => todo.date === todayStr);
    return todosOfToday;
  }

  static byPriority(priority) {
    const todos = Store.getTodos();
    const todosOfPriority = todos.map(todo => todo.priority === priority);
    return todosOfPriority;
  }
}

export { Filter as default };
