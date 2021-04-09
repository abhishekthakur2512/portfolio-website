import React from 'react';
import profile_pic from "../../images/profile_pic.jpg"
import { name_heading, designation } from '../Constants_style';
import './style.css';
import { Container } from '@material-ui/core';
import about_me_pic from "../../images/about_me_pic.jpg"

function AboutMe() {
  return (
    <div style= {{marginTop: '50px', alignItems:"center"}}>
      <p className = 'about_me_heading'>ABOUT ME</p>
      {/* <div className = 'about_me_content_wrapper'>
        <div> <img src={about_me_pic} className='about_me_pic'></img> </div>
        <div> <p className = 'about_me_content_write'>check check check check check check check check check check check check check check check check check </p> </div>
      </div> */}
      <div className = 'wrapper'>
        <div className = 'about_me_pic'><img src={about_me_pic} className='about_me_pic'></img> </div>
        <div className = 'about_me_content_write'> I am Abhishek Thakur. Abhi kuch nahi hai likhne ke liye baad mein aana please jab kuch likh lunga thanks ly.</div>
      </div>
    </div>
  )
}

export default AboutMe