function newProjectEvent() {
  const projectSel = document.querySelector('#project-select');
  const projectwrapper = document.querySelector('#projectwrapper');
  projectSel.addEventListener('change', (event) => {
    const proj = event.target.value;
    if (proj === 'Add') {
      const newProject = document.createElement('input');
      newProject.classList.add('newproject');
      newProject.setAttribute('id', 'newproject');
      newProject.setAttribute('type', 'text');
      newProject.placeholder = 'New Project';
      projectwrapper.appendChild(newProject);
    }
  });
}


export { newProjectEvent as default };
