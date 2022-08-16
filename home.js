// nav bar links data
const nbLinks = [
    {
        name: "About",
        href: "about.html",
    },
    {
        name: "Amy's Wish Club",
        href: "awc.html",
    },
    {
        name: "Horses",
        href: "horses.html",
    },
    {
        name: "Support",
        href: "support.html",
    },
];

// render home page data

const navRight = document.getElementById('nav-right');

// render navbar
nbLinks.forEach(i => {
    const newLink = document.createElement('a');
    const li = document.createElement('li');
    newLink.textContent = i.name;
    newLink.setAttribute("href", i.href);
    li.appendChild(newLink);
    navRight.appendChild(li);
});

// render hidden part of navbar
const hiddenMenu = document.querySelector('nav>ul');

nbLinks.forEach(i => {
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