import React, { useState } from 'react';
import { Header, Footer } from './Homepage'; // Import Header and Footer
import '../Homepage.css'; // Import necessary styles
import '../Contact.css'; // Import specific styles for the Contact Us page
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/contact/send', formData);
      console.log('Form submitted successfully:', response.data);
      // Clear the form after submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <body className='emo'>
      <div className="contact-page">
        <Header />
        <br/>
        <br/>
        <section className="contact-section">
          <div className="contact-section-header">
            <div className="contact-container">
              <h2 className="contact-heading">Contact Us</h2>
              <p className="contact-description">
                We would love to hear from you! If you have any questions or concerns,
                please fill out the form below or reach us through the following contact details.
              </p>
            </div>
          </div>
          <div className="contact-container">
            <div className="contact-row">
              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="contact-info-icon-home">
                    <FontAwesomeIcon icon={faHome} />
                  </div>
                  <div className="contact-info-content-home">
                    <h4 className="contact-info-heading">Address</h4>
                    <p className="contact-info-text">123 Pet Street,<br /> Pet City, PC 12345</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon-phone">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="contact-info-content-phone">
                    <h4 className="contact-info-heading">Phone</h4>
                    <p className="contact-info-text">(123) 456-7890</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon-email">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="contact-info-content-email">
                    <h4 className="contact-info-heading">Email</h4>
                    <p className="contact-info-text">info@furryfinds.com</p>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit} className="contact-form-content">
                  <h2 className="contact-form-heading">Send Message</h2>
                  <div className="contact-input-box">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-input-name"
                      />
                    <span className="contact-input-label">Full Name</span>
                  </div>
                  <div className="contact-input-box">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-input-email"
                      />
                    <span className="contact-input-label">Email</span>
                  </div>
                  <div className="contact-input-box">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="contact-textarea-message"
                      ></textarea>
                    <span className="contact-textarea-label">Type your Message...</span>
                  </div>
                  <div className="contact-input-box">
                    <input
                      type="submit"
                      value="Send"
                      className="contact-submit-button"
                      />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </body>
  );
};

export default ContactUs;
