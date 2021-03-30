class Todo {
    constructor(id, title, description, date, priority, project) {
      this.title = title;
      this.description = description;
      this.priority = priority;
      this.project = project;
      this.date = date;
      this.id = id;
    }
}
  
function byPriority(todos, priority) {
    // const todos = Store.getTodos();
    const todosOfPriority = todos.filter(todo => todo.priority === priority);
    return todosOfPriority;
}

let todos = [];

let todo1 = new Todo(1, 'title1', 'dsc1', '01-January-2005', 'high', 'project1');
let todo2 = new Todo(2, 'title2', 'dsc2', '01-February-2005', 'low' , 'project2');
let todo3 = new Todo(3, 'title3', 'dsc3', '01-March-2005', 'low', 'project3');
let todo4 = new Todo(4, 'title4', 'dsc4', '01-April-2005', 'medium', 'project2');

todos.push(todo1);
todos.push(todo2);
todos.push(todo3);
todos.push(todo4);

let bypriorityLow = byPriority(todos, 'low');

console.log(bypriorityLow);