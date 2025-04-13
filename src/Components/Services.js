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
          <h3>Compassionate Relocation</h3>
          <p>We help seniors transition smoothly into their new homes with care and respect every step of the way.</p>
        </div>
        <div className="service-card">
          <h3>Downsizing Assistance</h3>
          <p>From sorting to donating and disposing, we assist in making downsizing stress-free and simple.</p>
        </div>
        <div className="service-card">
          <h3>Packing & Settling In</h3>
          <p>We carefully pack, transport, and help set up your new space so it feels like home right away.</p>
        </div>
        <div className="service-card">
          <h3>Family Coordination</h3>
          <p>We work closely with family members and caregivers to ensure everyone is informed and comfortable with the moving plan.</p>
        </div>
        <div className="service-card">
          <h3>Furniture Arrangement</h3>
          <p>We’ll arrange furniture and belongings based on the new space layout to prioritize safety and familiarity.</p>
        </div>
        <div className="service-card">
          <h3>Move Day Support</h3>
          <p>Our friendly team is on hand during move day to answer questions, provide updates, and handle unexpected needs.</p>
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
