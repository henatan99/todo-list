const taskformDiv = document.createElement('div');
const title = '<input type="text" id="title" name="title" ><br>';
const schedule = '<button id="schedule" class="schedule">Schedule</button>';
const note = '<span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span>';
const project = '<span class="iconify" data-icon="bx:bxs-category" data-inline="false"></span>';
const priority = '<span class="iconify" data-icon="ic:outline-low-priority" data-inline="false"></span>';
const addTask = '<button id="task-btn" class="tsk-btn">Add Task</button>';

taskformDiv.innerHTML = title + schedule + note + project + priority + addTask;


export { taskformDiv as default };