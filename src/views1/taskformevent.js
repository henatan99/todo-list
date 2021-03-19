import getSelectedOption from './getoption';
import Todo from '../classes/todo';
import Store from '../classes/store';

const taskFormEvent = () => {
    const taskForm = document.getElementById("taskform");
    const formWraper = document.getElementById("formwrapper");
    let title = document.querySelector('#title');
    let selectProject = document.querySelector('#select-project');
    // const selectProject = taskForm.childNodes[0].childNodes[1];
    let selectPriority = document.querySelector('#select-priority');
    // const selectPriority = taskForm.childNodes[1].childNodes[1];
    let dateDiv = document.getElementById("dateDiv"); 
    let noteText = document.getElementById("note");
    


    const taskObj = new Todo();
    taskForm.addEventListener('click', (event) => {
        const elem = event.target;
        if(elem.classList.contains('tsk-btn')) {
            // alert('Task button clicked');
            if (formWraper.style.display == 'none') {
                formWraper.style.display == 'flex';                
            }            

            let titl = title.value;
            let date = dateDiv.value;
            let desc = noteText.value;
            let project = getSelectedOption(selectProject).value;
            let priority = getSelectedOption(selectPriority).value;
            taskObj.title = titl;
            taskObj.description = desc;
            taskObj.project = project;
            taskObj.priority = priority;
            taskObj.date = date;
            let todos = Store.getTodos();
            let id = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
            taskObj.id = id;            
            Store.addTodo(taskObj);

            formWraper.style.display = 'none';
        }
    });
}

export {taskFormEvent as default};