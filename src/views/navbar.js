import rootPath from '../helpers/rootpath';
import profileImg from '../assets/images/photo.jpeg'

const ROOT = rootPath();

// const imgPath = (img) => {
//     return `${ROOT}/src/assets/images/${img}`;
// } 

const imgPath = new Image();
imgPath.src = profileImg;
imgPath.classList.add('profileImg');

const profile = (profileImg, userName) => {
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profileDiv');
    profileDiv.setAttribute('id', 'profileDiv');

    let profileImgDiv = document.createElement('div');
    profileImgDiv.classList.add('profileImageDiv');
    profileImgDiv.appendChild(imgPath);

    let userNameSpan = `<span class="userNameSpan">${userName}</span>`;
    profileDiv.innerHTML = profileImgDiv.innerHTML + userNameSpan;
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