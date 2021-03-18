import Store from '../classes/store';

const deleteTodo = () => {
    document.querySelector('#todoDiv').addEventListener('click', (e) => {
        
        const btn = e.target;
        
        if (btn.classList.contains('iconify')) {
        alert(`You clicked ${btn}`);
        const todo = btn.parentElement.parentElement.parentElement;
        const todoTitle = todo.childNodes[0];
        todo.remove();
        Store.removeTodo(todoTitle.textContent);
        alert(`You removed ${todo}`);
        }
    });
}

export {deleteTodo as default};
