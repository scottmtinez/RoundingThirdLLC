import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>From First Base to Your Front Door - We're With You Every Step.</h1>
          <p>
            As two friends who built Rounding Third with hard work and heart, we know what it takes to go the extra mile. 
            We treat your move like it's our own - because for us, it's more than a job. It's a calling!
          </p>
          <a href="/estimate" className="cta-button">Get a Free Quote</a>
        </div>
      </header>

      {/* Services Overview */}
      <section className="services-overview">
        <h2>Our Senior Moving Services</h2>
        <div className="services-list">
          <div className="service-item">
            <h3>Compassionate Relocation</h3>
            <p>We help seniors transition smoothly into their new homes with care and respect every step of the way.</p>
          </div>
          <div className="service-item">
            <h3>Family Coordination</h3>
            <p>We work closely with family members and caregivers to ensure a seamless and supportive moving experience.</p>
          </div>
          <div className="service-item">
            <h3>Packing & Settling In</h3>
            <p>We carefully pack, transport, and help set up your new space so it feels like home right away.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Move?</h2>
        <p>Contact us today and let us handle the heavy lifting for you.</p>
        <a href="/contact" className="cta-button">Get Started</a>
      </section>
    </div>
  );
}

export default Home;
