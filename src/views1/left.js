function appendProject(projectObj, projectsId) {
    const projects = document.querySelector(projectsId); 
    
    const project = document.createElement('li');
    project.classList.add('project');
    project.setAttribute('id', 'project');    
    project.textContent = `${projectObj}`;  
    projects.appendChild(project);  
}

function listProjects(projects) {
    projects.forEach((project) => appendProject(project, '#projects'));    
}

export {listProjects as default};