import { NAVBAR_DATA } from './image-data.js';


const navRight = document.getElementById('nav-right');

// render navbar
NAVBAR_DATA.forEach(i => {
    const newLink = document.createElement('a');
    const li = document.createElement('li');
    newLink.textContent = i.name;
    newLink.setAttribute("href", i.href);
    li.appendChild(newLink);
    navRight.appendChild(li);
});

// render hidden part of navbar
const hiddenMenu = document.querySelector('nav>ul');

NAVBAR_DATA.forEach(i => {
    const newLink = document.createElement('a');
    const li = document.createElement('li');
    newLink.textContent = i.name;
    newLink.setAttribute("href", i.href);
    li.appendChild(newLink);
    hiddenMenu.appendChild(li);
});
