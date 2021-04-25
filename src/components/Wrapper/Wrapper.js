import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactHowler from 'react-howler'
import { Particles } from "react-particles-js";
import { CSSTransition } from 'react-transition-group';
// import { mute_button } from '../Constants_style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import volume_up from '../../images/volume_up.png';
import mute from '../../images/mute.png';

import particle from './particle-config';
// import particle2 from './particle-config-2';
import particle_snow from './particle_snow';

import "./styles.css";
import bg_music from '../../media/bg_music_3.mp3'


import Footer from '../Footer/Footer'
import Home from '../Home/Home'
import AboutMe from '../AboutMe/AboutMe'
import Dumbcharades from '../Dumbcharades/Dumbcharades'

function Wrapper() {
    const [componentState, setComponentState] = useState('home');
    const [homePageCss, setHomePageCss] = useState('body_art');
    const [particleState, setParticleState] = useState(particle);
    const [inProp, setInPropState] = useState(false);
    const [isMute, setIsMute] = useState(false);
    function ComponentSelect() {
        switch(componentState) {
            case 'home': 
                return <Home/>
            case 'aboutMe':
                return <AboutMe/>
            case 'game':
                return <Dumbcharades/>
            default: 
                return <></>
        }
    }

    function setPageState(pageState) {
        switch(pageState) {
            case 'home': 
                setComponentState('home');
                setHomePageCss('body_art');
                setParticleState(particle);
                setInPropState(isHomePageCheck);
                break;
            case 'aboutMe':
                setComponentState('aboutMe');
                setHomePageCss('body_plain')
                setParticleState(particle_snow);
                setInPropState(isHomePageCheck);
                break;
            case 'game': 
                setComponentState('game');
                setHomePageCss('body_plain')
                setParticleState(particle_snow)
                setInPropState(isHomePageCheck)
                setIsMute(true)
                break;
            default: 
                break;
        }
    }

    function handleMuteToggle() { setIsMute(!isMute); }

    function isHomePageCheck() { return (componentState === 'home' && true ) }

    return (
        <div className = {homePageCss}>
        <Particles className='particle' params={particleState} />
        <Router>
        {/* <ReactHowler src={bg_music} playing={!isMute && true} preLoad={true} loop={true} /> */}

        <div style={{width:"100%"}}>
            <AppBar style={{ position:'relative', alignItems:'center', background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <button className="btn from-top" onClick = { () => {setPageState('home')} } >H O M E</button>
                    {/* <button className="btn from-top" onClick = { () => {setPageState('blog')} } >B L O G</button> */}
                    <button className="btn from-top" onClick = { () => {setPageState('aboutMe')} } >A B O U T&nbsp;&nbsp;&nbsp; M E</button>
                    <button className="btn from-top" onClick = { () => {setPageState('home')} } >R E S U M E</button>
                    <button className="btn from-top" onClick = { () => {setPageState('game')} } >G A M E</button>
                </Toolbar>
            </AppBar>
        </div>

        <Route path = "/dumbcharades" exact component = {Dumbcharades}/>

        <CSSTransition in={inProp} timeout={2000} classNames="my-node">
            <ComponentSelect/>
        </CSSTransition>

        <div style = {{textAlign: 'center', marginTop: '1rem'}}>
            <button onClick = {handleMuteToggle} style= {{background: 'transparent', border: 'none', outline: 'none', opacity: 0.5}}>
                {
                    isMute ? 
                    <img src = {mute} className='mute-logo' alt = {mute}></img> :
                    <img src = {volume_up} className='mute-logo' alt = {volume_up}></img>
                }
            </button>
        </div>

        <Footer/>
        </Router>
        </div>
    )
}

export default Wrapper

// onCopy={() => this.setState({copied: true})}