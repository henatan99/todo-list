import Store from '../classes/store';
import Filter from '../classes/filter';

function removeProject() {
    document.querySelector('#projects').addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.classList.contains('project-btn')) {
            const project = btn.parentElement;            
            // let todoId = todo.getAttribute('value');
            const projectName = project.childNodes[0].textContent;
            let projectTodos = Filter.byProject(projectName);
            alert(projectTodos);
            alert(project.childNodes[0]);
            alert(projectName);
            // alert(todoId);            
            for (let i=0; i<projectTodos.length; i+=1) {                
                Store.removeTodo(projectTodos[i].id);             
            }
            project.remove();              
        }
    });
}


export {removeProject as default};