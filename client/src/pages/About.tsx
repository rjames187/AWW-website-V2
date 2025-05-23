import DirectorProfile from '../components/DirectorProfile';
import { DataService } from '../DataService';
import './about.css';

const directors = DataService.getDirectors();

function About() {
  return (
    <main>
      <section id="about">
        <div>
          <h1>Our Story</h1>
          <img
            src="./doreen_and_amy.jpg"
            alt="Photograph of Doreen Bruton and Amy Stefanko"
          />
          <p>
                Doreen Bruton founded Amy's Wish With Wings Charity in 2011 to give
                Amy Stefanko her wings. Due to complications from leukemia Amy had
                to learn how to speak and walk again. Amy started equine assisted
                services to help her recover. Amy's wish was to learn to ride
                independent of a lead line with side walkers and under Doreen's care
                and instruction she achieved her wish! Amy continues to flourish
                today in the program held at Ride with Pride Horsemanship School in
                Southlake, Texas. Amy's Wish kids compete at the Equestrian Special
                Olympics every Spring. We will also be compete at the Chisholm
                Challenge held at the Fort Worth Stock Show in January.
          </p>
          <h2>Healing with Horses</h2>
          <p>
                The success of equine assisted services is neurological and
                bio-physical, our brain is constantly communicating with our body.
                The brain is always assessing its surroundings, making adjustments
                and compensating. Sometimes through injury or illness, those
                assessment and compensation pathways are impaired or change,
                creating a disability. Those pathways need to be strengthened and
                rehabilitated.” Michigan State University Extension educators
                contend that equine assisted services are a viable activity that
                works to do just that.
          </p>
          <p className="discrim">
                Amy’s Wish With Wings does not and shall not discriminate on the
                basis of race, color, religion, (creed), gender expression, age,
                national origin (ancestry), disability, marital status, sexual
                orientation, or military status, in any of its activities or
                operations.
          </p>
        </div>
      </section>
      <section id="directors">
        <div>
          { directors.map((director) => <DirectorProfile data={director} />) }
        </div>
      </section>
    </main>
  )
}

export default About;