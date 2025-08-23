import './awc.css'

function AmysWishClub() {
  return (
    <main>
      <div className="warning-banner">
        Text Doreen Bruton 
        (<a href="tel:817-999-8332">817-999-8332</a>) 
        for a barn tour to discuss your child's needs and available class times
      </div>
      <section id="awc">
        <div>
          <h1>Amy's Wish Club</h1>
          <img src="./artcamp.jpg" alt="" />
          <h2>For Riders with Diverse Needs</h2>
          <p>
            We are a PATH Center that offers equine adaptive riding for children
            who experience restricted participation in life situations. Our
            program (EAS) Equine Assisted Services also known as Therapeutic
            Horsemanship, is designed to teach horsemanship and riding skills to
            individuals with diverse abilities. Our goal is to increase
            functional life skills, improve balance, posture, mobility and
            function. EAS is provided by PATH International certified
            therapeutic riding Instructors, wonderful volunteers and our beloved
            horses.
          </p>
          <h2>Who Benefits?</h2>
          <p>
            Children who can benefit from Equine Assisted Services (EAS):
            Attention deficit disorder, learning disabilities, down syndrome,
            developmental delay, brain injuries, cerebral palsy, stroke, hearing
            & vision impairment, balance issues, selective mutism and autism.
            Potential benefits may include physical fitness and improved
            cognitive, emotional, social, or behavioral skills. Some see
            increases in self-esteem, increased balance, motor control and
            coordination. Improvement in social skills, behavior skills and
            overall increased emotional well-being.
          </p>
          <h2>Interested?</h2>
          <p>
            Call or text 817-999-8332 and schedule an appointment to visit our
            facility to see if we are the right fit for you and your child.
            Download the forms below, then email or bring in person.
            Participants must meet the weight guidelines of under 150 lbs. for
            our horses.
          </p>

          <div>
            <a href="./files/rider_registration.pdf" target="_blank"
            >Rider Registration<img
                src="./download.png"
                alt="download"
              /></a>
            <a href="./files/LessonRegistration.docx" download
            >Lesson Registration<img
                src="./download.png"
                alt="download"
              /></a>
            <a href="./files/waiver.pdf" target="_blank"
            >Student Release/Waiver Form<img
                src="./download.png"
                alt="download"
              /></a>
            <a href="./files/med_form.pdf" target="_blank"
            >Student Medical Release<img
                src="./download.png"
                alt="download"
              /></a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AmysWishClub;