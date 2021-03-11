import rootPath from '../helpers/rootpath';

const ROOT = rootPath();

const imgPath = (img) => {
    return `${ROOT}/src/assets/images/${img}`;
} 

const profile = (profileImg, userName) => {
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profileDiv');
    profileDiv.setAttribute('id', 'profileDiv');

    let profileImgPath = imgPath(profileImg);
    let profileImgDiv = `${'<div class="profileImgdiv"><img src="../src/'}${profileImgPath}" class="profileImg"></div>`;
    let userNameSpan = `<span class="userNameSpan">${userName}</span>`;
    profileDiv.innerHTML = profileImgDiv + userNameSpan;
    return profileDiv; 
}

const navBar = (profileImg, userName) => {
    let navBarNav = document.createElement('nav');
    navBarNav.classList.add('navBarNav');
    navBarNav.setAttribute('id', 'navBarNav');

    let profileDiv =  profile(profileImg, userName);
    navBarNav.appendChild(profileDiv);
    
    return navBarNav;
}

export { navBar as default };