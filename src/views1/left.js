function appendProject(projectObj, projectsId) {
    const projects = document.querySelector(projectsId); 
    
    const project = document.createElement('li');
    project.classList.add('project');
    project.setAttribute('id', 'project');    
    project.textContent = `${projectObj}`;
    
    const projectbtn = document.createElement('button');
    projectbtn.classList.add('project-btn');
    projectbtn.setAttribute('type', 'click');
    projectbtn.textContent='delete';

    project.appendChild(projectbtn);

    projects.appendChild(project);  
}

function listProjects(projects) {
    projects.forEach((project) => appendProject(project, '#projects'));    
}

export {listProjects as default};