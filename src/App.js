import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import UCTest from './components/UCTest/UCTest';
import Wrapper from './components/Wrapper/Wrapper'


class App extends Component{
  render(){
      return (
          <UCTest/>
          // <Wrapper/>
      );
  };
}
   
export default App; 