import './About.css';

function About() {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About Our Moving Company</h1>
        <p>Providing reliable, affordable, and stress-free moving services for years.</p>
      </header>

      {/* About Us Content */}
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            We are a team of professional movers dedicated to making your relocation smooth and hassle-free. 
            With years of experience, we have helped thousands of families and businesses move safely and efficiently.
          </p>
        </div>

        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide top-notch moving services with integrity, transparency, and customer satisfaction 
            at the core of everything we do. We handle your belongings with the utmost care and professionalism.
          </p>
        </div>

        <div className="about-text">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✅ Experienced and professional movers</li>
            <li>✅ Affordable pricing with no hidden fees</li>
            <li>✅ Safe and secure transportation</li>
            <li>✅ Fully licensed and insured</li>
            <li>✅ Exceptional customer service</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Let’s Make Your Move Stress-Free!</h2>
        <p>Contact us today to get a free quote and experience the best moving service.</p>
        <a href="/contact" className="cta-button">Get a Free Quote</a>
      </section>
    </div>
  );
}

export default About;
