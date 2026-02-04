import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
 

const About = () => {


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,

};


  return (
     <>
    <div style={{background: "linear-gradient(135deg, #777e87, #caddec)", padding:"40px 70px", textAlign:"center"}}>
      <h2 className='text-center mb-4' >About US...</h2>
      <Slider {...settings} >
        
        
        <div>
          <h3>
            Digify is a digital solutions company building modern, scalable web
            applications for growing businesses.
          </h3>
        </div>

        <div>
          <h3>
            We create powerful online experiences using clean design, smart
            technology, and reliable performance.
          </h3>
        </div>

        <div>
          <h3>
            Every solution is built for speed, security, and long-term growth.
            Transparency and quality drive everything we do.
          </h3>
        </div>

        <div>
          <h3>
            From startups to enterprises, Digify is a trusted digital partner—from
            idea to launch and beyond.
          </h3>
        </div>
        
      </Slider>
      </div>
      <div style={{padding:"60px", textAlign:"center", backgroundColor:" #9fc7e9"}}>
        <h1>Stop blending in. Start leaving your mark—talk to our designers</h1>
      </div>
    </>
  )
}

export default About