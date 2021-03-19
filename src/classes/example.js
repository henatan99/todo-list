class Someobj {
    constructor(title, description, priority, project, date) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.date = date;
    }
}

let todos = [];

for (let i=0; i<10; i+=1) {
    todos.push(new Someobj(`title-${i+1}`, `description-${i+1}`, `priority-${i+1}`, `project-${i+1}`, `date-${i+1}`));
}

let allProjects = todos.map(todo => todo.project);
let todosOfProject = todos.filter(todo => todo.project == 'project-2');

Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

const toDay = () => {
    var newDate = new Date();
    var datetime = newDate.today();
    return datetime;
}

let toDate = toDay().split('/');
// console.log(todos);
// console.log(allProjects);
// console.log(todosOfProject);
console.log(toDate);


    
