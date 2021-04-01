import toDay from './timenow';

class Filter {
  static allProjects(todos) {
    const allProjects = todos.map(todo => todo.project);
    allProjects.push('Home');
    allProjects.push('Work');
    allProjects.push('Exercise');
    const unqPrjcts = allProjects.filter((item, i, allProjects) => allProjects.indexOf(item) === i);
    return unqPrjcts;
  }

  static byProject(todos, project) {
    const todosOfProject = todos.filter(todo => todo.project === project);
    return todosOfProject;
  }

  static byToday(todos) {
    const toDate = toDay().split('/');
    const todayStr = `${toDate[2] - toDate[1] - toDate[0]}`;
    const todosOfToday = todos.filter(todo => todo.date === todayStr);
    return todosOfToday;
  }

  static byPriority(todos, priority) {
    const todosOfPriority = todos.filter(todo => todo.priority === priority);
    return todosOfPriority;
  }
}

export { Filter as default };
