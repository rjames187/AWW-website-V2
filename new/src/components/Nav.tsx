import './Nav.css'

function Nav() {
    return (
      <nav>
        <div>
            <a href="home.html" id="nav-left"> Amy's Wish with Wings </a>
            <ul id="nav-right">
              <img src="./public/menu-icon.svg" alt="menu" />
            </ul>
        </div>
        <ul className="hidden">
        </ul>
      </nav>
    )
}

export default Nav;