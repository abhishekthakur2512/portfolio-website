import React, { Component } from 'react';
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

import "./styles.css";

import profile_pic from "../../images/profile_pic.jpg"
// import background from "../../images/background.jpg"
// import background_music from "../../media/bg-music.mp3";
import particle from './particle-config';
import particle2 from './particle-config-2';

import { Particles } from "react-particles-js";

import bg_music from '../../media/bg-music-2.mp3'

console.log(particle);

const sound = new Howl({
    src: [{bg_music}],
    autoplay:true,
    loop:true,
    volume: 0.5,
    onend: function() {
        console.log('Finished!');
    }
});

class Wrapper extends Component {
    
    constructor(props) {
        super(props);
        console.log('hello');
        console.log('s');
        sound.play(1);
    }
    
    render () {
        return (
            <React.Fragment>
            <div className = 'body'>
                <Particles 
                    className='particle'
                    params={particle}
                />
                <div style={{width:"100%", position: 'absolute'}}>
                    <div style= {{position:'static'}}>
                        <AppBar style={{ position:'fixed', alignItems:'center', background: 'transparent', boxShadow: 'none'}}>
                            <Toolbar>
                                    <div className="btn from-top">HOME</div>
                                    <div className="btn from-top">BLOG</div>
                                    <div className="btn from-top">ABOUT ME</div>
                                    <div className="btn from-top">RESUME</div>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <img src={profile_pic} alt="profile" className='profile-image'></img>
                    <p style= {{textAlign:"center", color:"white", margin:"0em", marginTop:"1em", fontSize:"50px"}}>Hi, I'm Abhishek Thakur.</p>
                    <p style= {{textAlign:"center", color:"grey", fontSize:"15px"}}>Software Developer @UrbanCompany (formely UrbanClap)</p>
                    <hr style={{width:"50%", align: "center"}}/> 
                    
                </div>
                
                <ReactHowler
                    src={bg_music}
                    playing={true}
                    preLoad={true}
                    loop={true}
                    // ref={(ref) => (this.player = ref)}
                />
            </div>
            </React.Fragment>
            
        )
    }   
}

export default Wrapper

/* <AppBar position = "static" style={{ background: 'transparent', boxShadow: 'none', alignItems: 'center' }}>
                <Toolbar>
                        <div className="btn from-top">HOME</div>
                        <div className="btn from-top">BLOG</div>
                        <div className="btn from-top">ABOUT ME</div>
                        <div className="btn from-top">RESUME</div>
                </Toolbar>
                </AppBar>
        
                <div src={profile_pic} class='profile-image'/>
    
                <p style= {{textAlign:"center", color:"white", margin:"0em", marginTop:"1em", fontSize:"50px"}}>Hi, I'm Abhishek Thakur.</p>
                <p style= {{textAlign:"center", color:"grey", fontSize:"15px"}}>Software Developer @UrbanCompany (formely UrbanClap)</p>
                <hr style={{width:"50%", align: "center"}}/> */