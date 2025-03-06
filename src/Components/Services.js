import './Services.css';

function Services() {
  return (
    <div className="services-container">
      {/* Header Section */}
      <header className="services-header">
        <h1>Our Moving Services</h1>
        <p>We provide reliable and affordable moving solutions tailored to your needs.</p>
      </header>

      {/* Services List */}
      <section className="services-list">
        <div className="service-card">
          <h2>🏡 Residential Moving</h2>
          <p>Safe and efficient home moving services, ensuring a smooth transition.</p>
        </div>
        <div className="service-card">
          <h2>🏢 Commercial Moving</h2>
          <p>Office and business relocations with minimal downtime.</p>
        </div>
        <div className="service-card">
          <h2>📦 Packing & Unpacking</h2>
          <p>Professional packing services to protect your valuable items.</p>
        </div>
        <div className="service-card">
          <h2>🚚 Long-Distance Moving</h2>
          <p>Reliable long-distance moves with tracking and timely delivery.</p>
        </div>
        <div className="service-card">
          <h2>🔐 Storage Solutions</h2>
          <p>Secure and climate-controlled storage options for your belongings.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="services-cta">
        <h2>Ready to Move?</h2>
        <p>Contact us today to get a free moving quote and experience hassle-free moving!</p>
        <a href="/contact" className="cta-button">Get a Free Quote</a>
      </section>
    </div>
  );
}

export default Services;
