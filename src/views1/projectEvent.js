import Filter from '../classes/filter';
import listTodos from './listTodos';
import removeTodos from './removeTodos';

function showProject() {
    document.querySelector('#projects').addEventListener('click', (e) => {
        let btn = e.target;
        if (btn.classList.contains('projecttext')) {
            let project = btn.parentElement;        
            alert(Filter.byProject(btn.textContent));
            let tods = document.getElementById("todos");
            tods.innerHTML = '';
            // removeTodos();
            listTodos(Filter.byProject(btn.textContent));
        }
    });
}

export {showProject as default};