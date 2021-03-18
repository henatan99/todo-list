const profile = (profileImg, userName) => {
    let imgPath = new Image();
    imgPath.src = profileImg;
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profileDiv');
    profileDiv.setAttribute('id', 'profileDiv');
    let profileImgDiv = `<div class="profileImgDiv"><img src=${imgPath.src} class="profileImg"></div>`;
    let userNameSpan = `<span class="userNameSpan">${userName}</span>`;
    profileDiv.innerHTML = profileImgDiv + userNameSpan;
    return profileDiv; 
}

const navBar = (profileImg, userName) => {
    let taskButton = document.createElement('button');
    taskButton.classList.add('task-Btn');
    taskButton.setAttribute('id', 'task-Btn');
    taskButton.setAttribute('type', 'click');
    taskButton.innerText = 'Add Task';

    let navBarNav = document.createElement('nav');
    navBarNav.classList.add('navBarNav');
    navBarNav.setAttribute('id', 'navBarNav');
    
    let profileDiv =  profile(profileImg, userName);
    navBarNav.appendChild(profileDiv);
    navBarNav.appendChild(taskButton);

    return navBarNav;
}

export { navBar as default };