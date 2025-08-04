import { useContext } from 'react';
import './home.css';
import { DataContext } from '../context/DataContext';
import { ContentObject } from '../components/cms/types';

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
          <a href="./support.html#volunteer">Volunteer</a>
          <a href="./support.html">Donate</a>
        </div>
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
        <a href="./about.html">About Us</a>
      </section>
      <section id="sponsors">
        <h2>Sponsors</h2>
        <br />
        <a href="support.html#sponsor">Become a Sponsor</a>
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