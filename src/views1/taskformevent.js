import getSelectedOption from './getoption';
import Todo from '../classes/todo';
import Store from '../classes/store';
import listTodos from './listTodos';

const taskFormEvent = () => {
    const taskForm = document.getElementById("taskform");
    const formWraper = document.getElementById("formwrapper");
    let title = document.querySelector('#title');
    let selectProject = document.querySelector('#project-select');
    let newProject = document.querySelector('#newproject');
    // const selectProject = taskForm.childNodes[0].childNodes[1];
    let selectPriority = document.querySelector('#priority-select');
    // const selectPriority = taskForm.childNodes[1].childNodes[1];
    let dateDiv = document.getElementById("dateDiv"); 
    let noteText = document.getElementById("note");
   
    const taskObj = new Todo();


    selectMonth.addEventListener('change', (event) => {        
        const proj = event.target.value;
        const projSel = getSelectedOption(proj).value;
        
        if (projSel.textContent == 'New') {
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'text');
        }
    });

    taskForm.addEventListener('click', (event) => {
        const elem = event.target;
        if(elem.classList.contains('tsk-btn')) {
            // alert('Task button clicked');
            if (formWraper.style.display == 'none') {
                formWraper.style.display == 'flex';                
                        

            let titl = title.value;
            let date = dateDiv.value;
            let desc = noteText.value;
            let project = getSelectedOption(selectProject).value;
            // let newProjectVal = newProject.textContent;
            let priority = getSelectedOption(selectPriority).value;
            taskObj.title = titl;
            taskObj.description = desc;
            taskObj.project = newProject.value == '' ? project : newProject.value;
            alert(`input: ${newProject.textContent} and ${taskObj.project}`);            
            taskObj.priority = priority;
            taskObj.date = date;
            let todos = Store.getTodos();
            let id = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
            taskObj.id = id;            
            Store.addTodo(taskObj);

            let tods = document.getElementById("todos");
            // tods.innerHTML = '';          
            listTodos(Store.getTodos());
            }
            else {
                formWraper.style.display = 'none';
            }
        }
    });
}

export {taskFormEvent as default};