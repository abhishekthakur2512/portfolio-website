import React, { useState } from 'react';
import ReactHowler from 'react-howler'
import { Particles } from "react-particles-js";
import { CSSTransition } from 'react-transition-group';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import particle from './particle-config';
import particle2 from './particle-config-2';
import particle_snow from './particle_snow';

import "./styles.css";
import bg_music from '../../media/bg_music_4.mp3'


import Footer from '../Footer/Footer'
import Home from '../Home/Home'
import AboutMe from '../AboutMe/AboutMe'

function Wrapper() {
    const [componentState, setComponentState] = useState('home');
    const [homePageCss, setHomePageCss] = useState('body_art');
    const [particleState, setParticleState] = useState(particle);
    const [inProp, setInPropState] = useState(false);
    function ComponentSelect() {
        switch(componentState) {
            case 'home': 
                return <Home/>
            case 'aboutMe':
                return <AboutMe/>
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
        }
    }

    function isHomePageCheck() {
        if(componentState == 'home') {
            return true;
        }
        return false;
    }

    function isAboutMeCheck() {
        if(componentState == 'aboutMe') return true;
        return false;
    }

    const isHomePage = isHomePageCheck();
    return (
        <div className = {homePageCss}>
            <Particles className='particle' params={particleState} />
            
            <ReactHowler src={bg_music} playing={false} preLoad={true} loop={true} />

                <div style={{width:"100%"}}>
                    <AppBar style={{ position:'relative', alignItems:'center', background: 'transparent', boxShadow: 'none'}}>
                        <Toolbar>
                                <button className="btn from-top" onClick = { () => {setPageState('home')} } >HOME</button>
                                <button className="btn from-top" onClick = { () => {setPageState('blog')} } >BLOG</button>
                                <button className="btn from-top" onClick = { () => {setPageState('aboutMe')} } >ABOUT ME</button>
                                <button className="btn from-top" onClick = { () => {setPageState('home')} } >RESUME</button>
                        </Toolbar>
                    </AppBar>
                </div>

            <CSSTransition in={inProp} timeout={2000} classNames="my-node">
                <ComponentSelect/>
            </CSSTransition>

            <Footer/>
        </div>
    )
}

export default Wrapper

// onCopy={() => this.setState({copied: true})}