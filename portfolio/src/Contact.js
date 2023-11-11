// Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-form">
      <div className="container">
        <div className="w-left"></div>
        <div className="awesome"></div>
        <div className="c-right">
          <form>
            <div className="user_name">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="user_name" required />
            </div>
            <div className="user_email">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="user_email" required />
            </div>
            <div className="user_message">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="user_message" required></textarea>
            </div>
            <input type="submit"/>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
