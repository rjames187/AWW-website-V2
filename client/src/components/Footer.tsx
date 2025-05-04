import { Page } from '../App';
import './Footer.css'
import { renderPageList } from './utils';

interface FooterProps {
  pages: Page[];
}

function Footer({ pages }: FooterProps) {
  return (
    <footer>
      <div>
        <div id="footer-nav">
            Navigation
          <ul>
            {
              renderPageList(pages)
            }
          </ul>
        </div>
        <div id="footer-mail">
          <span>Mailing Address</span><br />
            Amy's Wish With Wings<br />
            480 W. Highland St.<br />
            Southlake, Tx 76092<br />
            817-999-8332
        </div>
        <form action="">
          <span>Contact Us</span>
          <input
            id="form-name"
            type="text"
            placeholder="Enter your name"
            required
          />
          <input
            id="form-email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <textarea
            id="form-text"
            name=""
            placeholder="Enter your message"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <p>
            Download icon and wings favicon by
          <a href="https://icons8.com/">Icons8</a>
        </p>
        <p>
          <a href="https://github.com/rjames187/AWW-website-V2">View Source</a>
        </p>
        <p>© 2024 Amy's Wish with Wings All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer;