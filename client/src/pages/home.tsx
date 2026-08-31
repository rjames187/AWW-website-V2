import { useContext } from 'react';
import './home.css';
import { DataContext } from '../context/DataContext';
import { ContentObject } from '../components/cms/types';
import { Link } from 'react-router';

const CDN_HOST = import.meta.env.VITE_CDN_HOST;

function Home() {
  const { data } = useContext(DataContext);

  const dataToRender = data?.Sponsors ?? [];

  return (
    <main>
      <section id="hero">
        <h1>
          <span>Equine Assisted Services</span> <br />
            for Children with Diverse Needs
        </h1>
        <div>
          <Link to="/support#volunteer">Volunteer</Link>
          <Link to="/support#donate">Donate</Link>
        </div>
        <Link to="/support#book">Purchase our book</Link>
      </section>
      <section id="home-about">
        <h2>About Us</h2>
        <img src="./doreen_and_amy.jpg" alt="" />
        <ul>
          <li>Amy's Wish With Wings is a 501(c)(3) charitable organization.</li>
          <li>
                Our mission is to provide equine assisted services to children with
                diverse needs.
          </li>
          <li>
                Amy's Wish Equine Assisted Services Program is located at the Ride
                With Pride Horsemanship School in Southlake, Texas.
          </li>
        </ul>
        <Link to="/about">About Us</Link>
      </section>
      <section id="letter">
        <h2>From Our Families</h2>
        <p className="letter-intro">A letter to our founder, Doreen</p>
        <div className="letter-card">
          <p className="letter-salutation">Dear Doreen,</p>
          <p>
            I am writing to share with you how much your therapeutic horsemanship
            program has impacted my daughter, Megan. She started when she was 6 or
            7 and returned last year. The transformation we have seen over the
            years is truly incredible.
          </p>
          <p>
            Megan is non-verbal, but she communicates her immense love for your
            program in ways that speak louder than words. When she sees her riding
            helmet and boots, she laughs out loud with joy. The moment she is on
            the horse, she cannot stop smiling. That smile tells me that she feels
            freedom, joy, and a sense of accomplishment that she rarely
            experiences elsewhere.
          </p>
          <p>
            Thanks to the dedication of your staff and volunteers, I have seen
            such a massive improvement in her physical and emotional well-being.
            She has gained core strength and her physical balance has improved
            dramatically. Perhaps even more importantly, her confidence has
            soared. Being part of such a large, calm animal gives her a sense of
            autonomy and power that she simply cannot get in her daily life. She
            seems to feel it in her soul.
          </p>
          <p>
            Thank you for providing such a safe, welcoming, and life-changing
            environment. You have given her a place where she feels understood and
            capable. We are forever grateful to your organization and your
            volunteers for the passion you bring to therapeutic riding.
          </p>
          <p className="letter-signoff">With warmest thanks,</p>
          <p className="letter-name">Diane McGee</p>
          <p className="letter-role">Megan&apos;s mom</p>
        </div>
      </section>
      <section id="sponsors">
        <h2>Sponsors</h2>
        <br />
        <Link to="/support#sponsor">Become a Sponsor</Link>
        {
          dataToRender.map((category) => {
            return  (
              <>
                <h3 key={category.category}>
                  {category.category} 
                </h3>
                <div className='cat-div'>
                  {
                    category.items.map((sponsor: ContentObject) => {
                      if (sponsor.file) {
                        return (
                          <a key={sponsor.name} href={sponsor.href}>
                            <img src={`${CDN_HOST}/${sponsor.file.uploadKey}`} alt={sponsor.name} />
                          </a>
                        );
                      }
                      return (<div>{sponsor.name}</div>);
                    })
                  }
                </div>
              </>
            )
          })
        }
      </section>
    </main>
  )
}

export default Home;