import { useState } from 'react';
import { Page } from '../App';
import './Nav.css'
import { renderPageList } from './utils';
import { Link } from 'react-router-dom';

interface NavProps {
  pages: Page[];
}

function Nav({ pages }: NavProps) {

    const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState<boolean>(false);

    return (
      <nav>
        <div>
            <Link to="/" id="nav-left"> Amy's Wish with Wings </Link>
            <ul id="nav-right">
              <img src="../../public/menu-icon.svg" alt="menu" onClick={() => setHamburgerMenuVisible(!hamburgerMenuVisible)} />
              {
                renderPageList(pages)
              }
            </ul>
        </div>
        {
          hamburgerMenuVisible &&
          <ul>
            {
              renderPageList(pages)
            }
          </ul>
        }
      </nav>
    )
}

export default Nav;