import React from 'react';
import profile_pic from "../../images/profile_pic.jpg"
import { name_heading, designation } from '../Constants_style';


function Home() {
  return (
    <div style= {{marginTop: '50px'}}>
      <div style= {{textAlign: 'center'}}>
        <img src={profile_pic} className='profile-image'></img>
      </div>
      <p className = 'name_heading' style = {name_heading}>Hi, I'm Abhishek Thakur</p>
      <p style= {designation}>Software Developer @UrbanCompany (formely UrbanClap)</p>
    </div>
  )
}

export default Home