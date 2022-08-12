import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import UserNavbar from './components/Navbar';
import Landing from './components/Landing';

const App = () => {
  return (
    <BrowserRouter>
      <UserNavbar/>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path ="/login" element={<Login/>}/>
        <Route exact path ="/register" element={<Register/>}/>
        
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
