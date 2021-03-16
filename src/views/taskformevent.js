const taskFormEvent = () => {
    const taskForm = document.getElementById("taskform");
    let selectProject = document.getElementById("select-project");
    // const selectProject = taskForm.childNodes[0].childNodes[1];
    let selectPriority = document.getElementById("select-priority");
    // const selectPriority = taskForm.childNodes[1].childNodes[1];s
    const dateDiv = document.getElementById("dateDiv"); 
    const noteText = document.getElementById("note");
    const addTaskBtn = document.getElementById("tsk-btn");

    const taskObj = {'project': '', 'priority': '', 'date': ''};
    taskForm.addEventListener('click', (event) => {
        const elem = event.target;
        if(elem.classList.contains('tsk-btn')) {
            alert('Task button clicked');
            const date = dateDiv.value;
            // const date = `${year}-${month}-${day}`;
            let project = getSelectedOption(selectProject).value;
            let priority = getSelectedOption(selectPriority).value;
            taskObj['project'] = project;
            taskObj['priority'] = priority;
            taskObj['date'] = date;
            alert(`project: ${taskObj['project']}, priority: ${taskObj['priority']}, date: ${taskObj['date']}`);
            alert('nononono...');
        }     

    });
    // alert(`project: ${taskObj['project']}, priority: ${taskObj['priority']}, date: ${taskObj['day']}`);
}

export {taskFormEvent as default};