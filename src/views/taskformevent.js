import getSelectedOption from './getoption';
import Todo from '../classes/todo';
import Store from '../classes/store';

const taskFormEvent = () => {
    const taskForm = document.getElementById("taskform");
    let selectProject = document.querySelector('#select-project');
    // const selectProject = taskForm.childNodes[0].childNodes[1];
    let selectPriority = document.querySelector('#select-priority');
    // const selectPriority = taskForm.childNodes[1].childNodes[1];
    const dateDiv = document.getElementById("dateDiv"); 
    const noteText = document.getElementById("note");
    const addTaskBtn = document.getElementById("tsk-btn");

    const taskObj = new Todo();
    taskForm.addEventListener('click', (event) => {
        const elem = event.target;
        if(elem.classList.contains('tsk-btn')) {
            alert('Task button clicked');
            let date = dateDiv.value;
            
            let project = getSelectedOption(selectProject).value;
            let priority = getSelectedOption(selectPriority).value;
            taskObj.project = project;
            taskObj.priority = priority;
            taskObj.date = date;
            alert(`project: ${taskObj.project}, priority: ${taskObj.priority}, date: ${taskObj.date}`);
            alert('nononono...');
            Store.addTodo(taskObj);
        }

    });
}

export {taskFormEvent as default};