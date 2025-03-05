import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Wrapper from './components/Wrapper/Wrapper'
import Dad from './components/Dad/dad';



class App extends Component{
  render() {
    return (
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route path="/dad" element={<Dad />} />
      </Routes>
    );
  };
}
   
export default App; 