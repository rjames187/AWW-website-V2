import { SPONSOR_DATA } from './image-data.js';
import { renderNavBar } from './navbar.js';

renderNavBar();

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
