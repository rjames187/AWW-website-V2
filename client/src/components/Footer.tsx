import { useState } from 'react';
import { Page } from '../App';
import './Footer.css'
import { renderPageList } from './utils';

interface FooterProps {
  pages: Page[];
}

function Footer({ pages }: FooterProps) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  } 
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email,
      name,
      message
    }

    const workersHost = import.meta.env.VITE_WORKER_HOST || 'localhost:8787';

    const response = await fetch(`${workersHost}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error sending email:', errorData);
      alert('There was an error sending your message. Please try again later.');
      return;
    }

    alert('Your message has been sent successfully!');
    setEmail('');
    setName('');
    setMessage('');
  }

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
        <form action="" onSubmit={handleSubmit}>
          <span>Contact Us</span>
          <input
            id="form-name"
            type="text"
            placeholder="Enter your name"
            required
            onChange={handleNameChange}
          />
          <input
            id="form-email"
            type="email"
            placeholder="Enter your email"
            required
            onChange={handleEmailChange}
          />
          <textarea
            id="form-text"
            name=""
            placeholder="Enter your message"
            required
            onChange={handleMessageChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <p>
            Download icon and wings favicon by
          <a href="https://icons8.com/" target="_blank"> Icons8</a>
        </p>
        <p>
          <a href="https://github.com/rjames187/AWW-website-V2" target="_blank">View Source</a>
        </p>
        <p>© 2025 Amy's Wish with Wings All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer;