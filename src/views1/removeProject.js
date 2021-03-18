import Store from '../classes/store';
function removeProject() {
    document.querySelector('#projects').addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.classList.contains('project-btn')) {
            const project = btn.parentElement;            
            // let todoId = todo.getAttribute('value');

            // alert(todoId);
            project.remove();
            // Store.removeTodo(parseInt(todoId));   
        }
    });
}


export {removeProject as default};