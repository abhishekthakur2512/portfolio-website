import React from 'react';
import profile_pic from "../../images/profile_pic.jpg"
import { name_heading, designation } from '../Constants_style';


function Home() {
  return (
    <div style= {{marginTop: '50px'}}>
      <img src={profile_pic} className='profile-image'></img>
      <p style = {name_heading}>Hi, I'm Abhishek Thakur.</p>
      <p style= {designation}>Software Developer @UrbanCompany (formely UrbanClap)</p>
    </div>
  )
}

export default Home