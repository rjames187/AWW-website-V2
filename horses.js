import { NAVBAR_DATA, HORSE_DATA } from './image-data.js';


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

// render board of directors information
const horseSection = document.querySelector('#horses>div');

HORSE_DATA.forEach((item) => {
    const profileBody = document.createElement('div');
    const profSubBodyCont  = document.createElement('figure');

    const pfp = document.createElement('img');
    pfp.setAttribute('src', `./public/horses/${item.file}`) ;
    profSubBodyCont.appendChild(pfp);

    const figCap = document.createElement('figcaption');
    const name = document.createElement('h2');
    name.textContent = item.name;
    figCap.appendChild(name);

    if (item.bf) {
        item.bf.forEach((i) => {
            const award = document.createElement('p');
            award.textContent = `👑${i} Barn Favorite👑`;
            figCap.appendChild(award);
        })
    }

    if (item.th) {
        item.th.forEach((i) => {
            const award = document.createElement('p');
            award.textContent = `👑${i} Therapy Horse of the Year👑`;
            figCap.appendChild(award);
        })
    }

    profSubBodyCont.appendChild(figCap);
    profileBody.appendChild(profSubBodyCont);

    const desc = document.createElement('p');
    desc.textContent = item.description;
    profileBody.appendChild(desc);

    horseSection.appendChild(profileBody);
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