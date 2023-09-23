import React, { useState } from 'react';
import linkedin_logo from '../../images/linkedin_logo.png'
import phone_logo from '../../images/phone_logo.png';
import instagram_logo from '../../images/instagram_logo.png';
import email_logo from '../../images/email_logo.png';
import ReactTooltip from "react-tooltip";

// import { name_heading, designation, contact_logo } from '../Constants_style';
// import {CopyToClipboard} from 'react-copy-to-clipboard';


function Footer() {
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [isInstagramCopied, setIsInstagramCopied] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleLinkedInClick = () => {
    const url = 'https://www.linkedin.com/in/abhishekthakur3/';
    const win = window.open(url);
    win.focus();
  }

  const handlePhoneClick = () => {
    navigator.clipboard.writeText('7838150052');
    setIsPhoneCopied(true);
  }

  const handleInstagramClick = () => {
    navigator.clipboard.writeText('thaaakiii');
    setIsInstagramCopied(true);
  }

  const handleEmailClick = () => {
    navigator.clipboard.writeText('abhishekthakur251296@gmail.com');
    setIsEmailCopied(true);
  }

  
  return (
    <div style = {{textAlign: 'center', marginBottom: '1rem'}}>
      <hr style={{width:"50%", align: "center", marginTop: '50px'}}/> 
      
      {/* LinkedIn */}
      <button  onClick = {handleLinkedInClick}  data-tip data-for="linkedin" style= {{background: 'transparent', border: 'none', outline: 'none'}}>
        <img src={ linkedin_logo } className='contact-logo' alt = {phone_logo}></img>
      </button>
      <ReactTooltip id="linkedin" border='none' place="bottom" effect="solid">linkedin.com/in/abhishekthakur3</ReactTooltip>

      {/* Phone Number */}
      <button onClick = {handlePhoneClick} data-tip data-for="phone" style= {{background: 'transparent', border: 'none', outline: 'none'}}>
        <img src={ phone_logo } className='contact-logo' alt = {phone_logo}></img>
      </button>
      <ReactTooltip id="phone" place="bottom" effect="solid">
        { isPhoneCopied ? 'Copied!': '+91 7838150052' }
      </ReactTooltip>

      {/* Instagram */}
      <button onClick = {handleInstagramClick} data-tip data-for="instagram" style= {{background: 'transparent', border: 'none', outline: 'none'}}><img src={ instagram_logo } className='contact-logo' alt = {phone_logo}></img></button>
      <ReactTooltip id="instagram" place="bottom" effect="solid">
        { isInstagramCopied ? 'Copied!': 'thaaakiii' }
      </ReactTooltip>

      {/* Email */}
      <button onClick = {handleEmailClick} data-tip data-for="email" style= {{background: 'transparent', border: 'none', outline: 'none'}}><img src={ email_logo } className='contact-logo' alt = {phone_logo}></img></button>
      <ReactTooltip id="email" place="bottom" effect="solid">
        { isEmailCopied ? 'Copied!': 'abhishekthakur251296@gmail.com' }
      </ReactTooltip>

      {/* Github */}

    </div>
  )
}

export default Footer