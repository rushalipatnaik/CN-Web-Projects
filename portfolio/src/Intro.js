// Intro.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Intro.css';

const Intro = () => {
  return (
    <section id="intro" className="intro">
      <div className="container">
        <div className="contact">
          <div className="i-name">
            <span>Hi,</span>
            <span>I am</span>
            <span>Your Name</span>
          </div>
          <div className="i-icons">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
          <button className="button i-button">Hire Me</button>
        </div>
      </div>
    </section>
  );
}

export default Intro;
