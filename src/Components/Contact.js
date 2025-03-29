import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      {/* Header Section */}
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We’re here to make your move easy! Reach out to us today.</p>
      </header>

      {/* Contact Form */}
      <section className="contact-form">
        <h2>Get in Touch</h2>
        <form>
          <div className="form-group">
            <label className='contact-form-label'>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label className='contact-form-label'>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label className='contact-form-label'>Phone</label>
            <input type="tel" placeholder="Enter your phone number" required />
          </div>

          <div className="form-group">
            <label className='contact-form-label'>Message</label>
            <textarea placeholder="How can we help you?" rows="4" required></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>

      {/* Contact Details */}
      <section className="contact-details">
        <h2>Our Contact Information</h2>
        <p>📞 Phone: (123) 456-7890</p>
        <p>✉️ Email: support@movingcompany.com</p>
        <p>🕒 Hours: Mon - Fri, 8:00 AM - 6:00 PM</p>
      </section>
    </div>
  );
}

export default Contact;
