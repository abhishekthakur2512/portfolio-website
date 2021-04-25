import React, { useState } from 'react';
import { GAME_BUTTON_STYLE } from './Constants';
// import profile_pic from "../../images/profile_pic.jpg"
import Switch from "react-switch";

import './style.css';
import {STYLE_MOVIE} from './Constants';
import { csv } from 'd3';
import { EASY_MOVIES, HARD_MOVIES } from './movie_set';


function Dumbcharades() {

  const [movieObject, setMovieObject] = useState({title: 'Click to Generate a Movie'});
  const [isToggle, setIsToggle] = useState(false);

  const onGenerate = () => {
    const movieSet = isToggle ? HARD_MOVIES : EASY_MOVIES;
    console.log(isToggle);
    const randomMovie = Math.floor(Math.random() * movieSet.length);
    setMovieObject(movieSet[randomMovie]);
  }

  const onToggle = () => {
    setIsToggle(!isToggle);
  }

  return (
    <div style = {{textAlign: 'center'}}>
      <div style = {{textAlign: 'center' , paddingBottom: '1rem'}}>
          <button className = 'game_btn' onClick = {onGenerate}> G E N E R A T E </button> <br/>
      </div>
      <div>
        <text style = {{color: 'white', fontSize: 20}}> { isToggle ? 'HARD' : 'EASY'} </text>
        <Switch height = {17} width = {34} onColor = '#e34660' checkedIcon = '' uncheckedIcon = '' onChange={onToggle} checked={isToggle} />
      </div>
      <div style = {{margin: '0.3rem'}}>
        <text style = {{color: 'white', fontSize: '2rem'}}>{movieObject.title}</text> <br/>
      </div>

      <div style = {{marginBottom: '1rem'}}>
        <text style = {{color: 'white', fontSize: '1.5rem'}}>{movieObject.year}</text><br/>
      </div>
      <img src = {movieObject.posterurl} style = {STYLE_MOVIE}></img>
    </div>
    )
}

export default Dumbcharades