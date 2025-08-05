import './support.css';

function Support() {
  return (
    <main>
      <section id="donate">
        <h1>Donate as an Individual</h1>
        <div>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=QH8EZ5BGXS2XS"
            target="_blank"
          >PayPal</a>
          <a href="https://account.venmo.com/u/doreen-bruton" target="_blank">Venmo</a>
        </div>
      </section>
      <section id="sponsor">
        <div>
          <h1>Bobby Fest</h1>
          <img src="./bobbyfest.jpg" alt="" />
          <p>
            Bobbyfest started out 9 years ago as a backyard music festival
            hosted by Bobby & Lisa Rawls. In its third year, Bobby decided to
            leverage the event to raise money for charity. For the past 5 years,
            Bobbyfest has served as a charity event honoring Amy’s Wish With
            Wings. Attendees will enjoy live music, local vendors, auctions, &
            much more!
          </p>
          <h2>How to Sponsor</h2>
          <p>To sponsor our event, check out the Bobby Fest website.</p>
          <a href="https://bobbyfest.com/" target="_blank">bobbyfest.com</a>
        </div>
      </section>

      <section id="volunteer">
        <h1>Volunteer</h1>
        <p>Prospective volunteers should download and fill out the forms below.</p>
        <a href="./files/NewVolunteer.docx"
        >New Volunteer Form<img
            src="./download.png"
            alt="download"
          /></a>
        <a href="./files/volunteer.pdf" target="_blank"
        >Volunteer Release/Waiver Form<img
            src="./download.png"
            alt="download"
          /></a>
        <a href="./files/VolunteerInfo.docx"
        >Volunteer Information<img
            src="./download.png"
            alt="download"
          /></a>
      </section>
    </main>
  )
}

export default Support;