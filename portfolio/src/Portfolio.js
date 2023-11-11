// Portfolio.js
import React from 'react';
import Slider from 'react-slick';
import './Portfolio.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Portfolio = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <h2>Portfolio</h2>
        <div className="portfolio-slider">
          <Slider {...settings}>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUhEWjZNCn6loHMxp9ypG8g7lTK-PPkiFs0WlBGW_MTQ&s" alt="img-1" />
            </div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUhEWjZNCn6loHMxp9ypG8g7lTK-PPkiFs0WlBGW_MTQ&s" alt="img-2" />
            </div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUhEWjZNCn6loHMxp9ypG8g7lTK-PPkiFs0WlBGW_MTQ&s" alt="img-3" />
            </div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUhEWjZNCn6loHMxp9ypG8g7lTK-PPkiFs0WlBGW_MTQ&s" alt="img-4" />
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
