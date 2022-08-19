import { NAVBAR_DATA, SPONSOR_DATA } from './image-data.js';



// render home page data

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

// render sponsors
const sponsorSection = document.querySelector('#sponsors');

SPONSOR_DATA.forEach((category) => {
    const categoryHeading = document.createElement('h3');
    categoryHeading.textContent = category.category;
    sponsorSection.appendChild(categoryHeading);

    const categoryDiv = document.createElement('div');
    categoryDiv.setAttribute('class', 'cat-div');

    category.items.forEach((item) => {
        if (item.file) {
            const a = document.createElement('a');
            a.setAttribute("href", item.href);

            const img = document.createElement('img');
            img.setAttribute("src", `./public/sponsors/${item.file}`);
            img.setAttribute("alt", item.name);

            a.appendChild(img);
            categoryDiv.appendChild(a);
            return;
        }

        const div = document.createElement('div');
        div.textContent = item.name;

        categoryDiv.appendChild(div);
    });

    sponsorSection.appendChild(categoryDiv);
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