function appendProject(projectObj, projectsId) {
  const projects = document.querySelector(projectsId);

  const project = document.createElement('li');
  project.classList.add('project');
  project.setAttribute('id', 'project');

  const projectText = document.createElement('h1');
  projectText.getAttribute('id', 'projecttext');
  projectText.classList.add('projecttext');
  projectText.setAttribute('type', 'click');


  projectText.textContent = `${projectObj}`;

  const projectbtn = document.createElement('button');
  projectbtn.classList.add('project-btn');
  projectbtn.setAttribute('type', 'click');
  projectbtn.textContent = 'X';

  project.appendChild(projectText);
  project.appendChild(projectbtn);

  projects.appendChild(project);
}


function listProjects(projects) {
  projects.forEach((project) => appendProject(project, '#projects'));
}

export { listProjects as default };