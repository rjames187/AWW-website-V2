import { SPONSOR_DATA } from './image-data.js'
import { renderNavBar } from './navbar.js'

renderNavBar()

// render sponsors
const sponsorSection = document.querySelector('#sponsors')

SPONSOR_DATA.forEach(category => {
  const categoryHeading = document.createElement('h3')
  categoryHeading.textContent = category.category
  sponsorSection.appendChild(categoryHeading)

  const categoryDiv = document.createElement('div')
  categoryDiv.setAttribute('class', 'cat-div')

  category.items.forEach(item => {
    if (item.file) {
      const a = document.createElement('a')
      a.setAttribute('href', item.href)

      const img = document.createElement('img')
      img.setAttribute('src', `./public/sponsors/${item.file}`)
      img.setAttribute('alt', item.name)

      if (item.id) {
        a.setAttribute('id', item.id)
      }

      a.appendChild(img)
      categoryDiv.appendChild(a)
      return
    }

    const div = document.createElement('div')
    div.textContent = item.name

    categoryDiv.appendChild(div)
  })

  sponsorSection.appendChild(categoryDiv)
})

// append season of giving park place
sponsorSection.appendChild(document.createElement('br'))
const photoLink = document.createElement('a')
photoLink.setAttribute('href', 'https://www.parkplace.com/')
const photo = document.createElement('img')
photo.setAttribute('id', 'park-place')
photo.setAttribute('src', './public/parkplace.jpg')
photo.setAttribute('alt', 'Park Place grant')
photoLink.appendChild(photo)
sponsorSection.appendChild(photoLink)
sponsorSection.innerHTML += 'Season of Giving Grant Recipient'

const logoLink = document.createElement('a')
logoLink.setAttribute('href', 'https://www.parkplace.com/')
const logo = document.createElement('img')
logo.setAttribute('id', 'park-place-logo')
logo.setAttribute('src', './public/sponsors/parkplace.jpg')
logo.setAttribute('alt', '')
logoLink.appendChild(logo)
sponsorSection.appendChild(logoLink)
