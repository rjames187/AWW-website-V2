import { BOD_DATA } from './image-data.js';
import { renderNavBar } from './navbar.js';

renderNavBar();

// render board of directors information
const directorsSection = document.querySelector('#directors>div');

BOD_DATA.forEach((item) => {
    const profileBody = document.createElement('div');
    const profSubBodyCont  = document.createElement('figure');

    const pfp = document.createElement('img');
    pfp.setAttribute('src', `./public/BOD/${item.file}`) ;
    profSubBodyCont.appendChild(pfp);

    const figCap = document.createElement('figcaption');
    const name = document.createElement('h2');
    name.textContent = item.name;
    figCap.appendChild(name);
    const title = document.createElement('p');
    title.textContent = item.title;
    figCap.appendChild(title);

    if (item.email) {
        const email = document.createElement('a');
        email.textContent = item.email;
        email.setAttribute('href', `mailto:${item.email}`);
        figCap.appendChild(email);
    }

    if (item.phone) {
        const phone = document.createElement('a');
        const phoneString = String(item.phone)
        phone.textContent = `${phoneString.substring(0, 3)}-${phoneString.substring(3, 6)}-
            ${phoneString.substring(6, 10)}`;
        phone.setAttribute('href', `tel:${item.phone}`);
        figCap.appendChild(phone);
    }

    profSubBodyCont.appendChild(figCap);
    profileBody.appendChild(profSubBodyCont);

    const desc = document.createElement('p');
    desc.textContent = item.description;
    profileBody.appendChild(desc);

    directorsSection.appendChild(profileBody);
});

