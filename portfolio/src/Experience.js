// Experience.js
import React from 'react';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="achievement">
          <div className="circle">1</div>
          <div>
            <h3>Work Experience</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna nec dapibus aliquam.</p>
          </div>
        </div>

        <div className="achievement">
          <div className="circle">2</div>
          <div>
            <h3>Projects</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna nec dapibus aliquam.</p>
          </div>
        </div>

        <div className="achievement">
          <div className="circle">3</div>
          <div>
            <h3>Work</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna nec dapibus aliquam.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
