import { NAVBAR_DATA } from './image-data.js';

export function renderNavBar () {
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

    // hamburger menu functionality
    const hamburgerMenu = document.querySelector('#nav-right>img');

    hamburgerMenu.addEventListener('click', () => {
        if ([... hiddenMenu.classList].includes("hidden")) {
            hiddenMenu.classList.remove("hidden");
            return;
        }
        hiddenMenu.classList.add("hidden");
    });
}