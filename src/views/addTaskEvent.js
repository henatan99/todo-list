const addTaskEvent = () => {
    let addBtn = document.querySelector('#tsk-Btn');
    const cont = document.querySelector('#container');
    cont.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = e.target;        
        const taskForm = document.querySelector('#taskform');
        if (btn.classList.contains('tsk-Btn')) {
            if(taskForm.style.display == 'none') {
                taskForm.style.display = 'block';
            }
            else 
            {
                taskForm.style.display = 'none';
            }
        }
    });
}

export {addTaskEvent as default};