const taskFormEvent = () => {
    const taskObj = []; 
    const selectMonth = document.getElementById("selectMonth");
    const selectYear = document.getElementById("selectYear");
    const selectProject = document.getElementById("project");
    const selectPriority = document.getElementById("priority"); 
    const noteText = document.getElementById("note");
    const addTaskBtn = document.getElementById("tsk-btn");

    addTaskBtn.addEventListener('click', (event) => {
        const month = getSelectedOption(selectMonth).value;
        const year = getSelectedOption(selectYear).value;
        // const date = 
        const project = getSelectedOption(selectProject).value;
        const priority = getSelectedOption(selectPriority).value;
        taskObj.push([]);        
    });
}