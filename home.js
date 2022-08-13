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

nbLinks.forEach(i => {
    const newLink = document.createElement('a');
    const li = document.createElement('li');
    newLink.textContent = i.name;
    newLink.setAttribute("href", i.href);
    li.appendChild(newLink);
    navRight.appendChild(li);
});
