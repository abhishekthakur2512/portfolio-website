import React from 'react';
import linkedin_logo from '../../images/linkedin_logo.png'
import phone_logo from '../../images/phone_logo.png';
import instagram_logo from '../../images/instagram_logo.png';
import email_logo from '../../images/email_logo.png';
import ReactTooltip from "react-tooltip";

import { name_heading, designation, contact_logo } from '../Constants_style';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function Footer() {
  return (
    <div style = {contact_logo}>
      <hr style={{width:"50%", align: "center", marginTop: '50px'}}/> 
      <CopyToClipboard text={'hello'}>
          <button data-tip data-for="linkedin" style= {{background: 'transparent', border: 'none', outline: 'none'}}>
              <img src={ linkedin_logo } className='contact-logo'></img>
          </button>
      </CopyToClipboard>
      <button data-tip data-for="phone" style= {{background: 'transparent', border: 'none', outline: 'none'}}><img src={ phone_logo } className='contact-logo'></img></button>
      <button data-tip data-for="instagram" style= {{background: 'transparent', border: 'none', outline: 'none'}}><img src={ instagram_logo } className='contact-logo'></img></button>
      <button data-tip data-for="email" style= {{background: 'transparent', border: 'none', outline: 'none'}}><img src={ email_logo } className='contact-logo'></img></button>

      <ReactTooltip id="linkedin" border='none' place="bottom" effect="solid">linkedin.com/in/abhishekthakur3</ReactTooltip>
      <ReactTooltip id="phone" place="bottom" effect="solid">+91 7838150052</ReactTooltip>
      <ReactTooltip id="instagram" place="bottom" effect="solid">abhishekk2512</ReactTooltip>
      <ReactTooltip id="email" place="bottom" effect="solid">abhishekthakur251296@gmail.com</ReactTooltip>
    </div>
  )
}

export default Footer