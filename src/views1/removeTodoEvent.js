import Store from '../classes/store';
function removeTodo() {
    document.querySelector('#todos').addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.parentElement.classList.contains('del-todo')) {
            const todo = btn.parentElement.parentElement;            
            let todoId = todo.getAttribute('value');

            alert(todoId);
            todo.remove();
            Store.removeTodo(parseInt(todoId));           
        }
    });
}


export {removeTodo as default};