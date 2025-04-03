import './Contact.css';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function Contact() {
  // States
    const form = useRef();
    const [notification, setNotification] = useState({ message: '', type: '' });

  // EmailJS configuration
    const sendEmail = async (e) => {
      e.preventDefault();

      const formData = {
        name: form.current.name.value,
        email: form.current.email.value,
        phone: form.current.phone.value,
        message: form.current.message.value,
        timestamp: new Date(),
      };

      try {
        // Send email using EmailJS
          await emailjs.sendForm('HIDDEN', 'HIDDEN', form.current, 'HIDDEN');

        // Store form data in Firestore
          await addDoc(collection(db, 'ContactPage'), formData);

        // Set notification message
          console.log('Email sent successfully!');
          setNotification({ message: 'Message sent successfully!', type: 'success' });
      } catch (error) {
        console.error('Error:', error);
        setNotification({ message: 'Failed to send message. Please try again later.', type: 'error' });
      }

      e.target.reset();
    };

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
        <form onSubmit={sendEmail} ref={form}>
          <div className="form-group">
            <label className='contact-form-label'>Name</label>
            <input type="text" name="name" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label className='contact-form-label'>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label className='contact-form-label'>Phone</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" required />
          </div>

          <div className="form-group">
            <label className='contact-form-label'>Message</label>
            <textarea name='message' placeholder="How can we help you?" rows="4" required></textarea>
          </div>

          {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>

      {/* Contact Details */}
      <section className="contact-details">
        <h2>Our Contact Information</h2>
        <p>📞 Phone(s): (262) 354-4842 and (262) 951-6711</p>
        <p>✉️ Email: support@movingcompany.com</p>
        <p>🕒 Hours: Mon - Fri, 8:00 AM - 6:00 PM</p>
      </section>
    </div>
  );
}

export default Contact;
