import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Reliable & Affordable Moving Services</h1>
          <p>Let us make your move stress-free and seamless.</p>
          <a href="/contact" className="cta-button">Get a Free Quote</a>
        </div>
      </header>

      {/* Services Overview */}
      <section className="services-overview">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-item">
            <h3>Residential Moving</h3>
            <p>Safe and efficient home moving services.</p>
          </div>
          <div className="service-item">
            <h3>Commercial Moving</h3>
            <p>Office and business relocations with minimal downtime.</p>
          </div>
          <div className="service-item">
            <h3>Packing & Unpacking</h3>
            <p>We pack and unpack your belongings with care.</p>
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
