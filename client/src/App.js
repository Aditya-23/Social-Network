import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import UserNavbar from './components/Navbar';
import Landing from './components/Landing';
import store from './store'
import { Provider } from 'react-redux';
import AlertComp from './components/Alert'
import {loadUser} from './actions/auth'
import { setAuthToken } from './utils';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateProfile from './components/dashboard/CreateProfile';
import EditProfile from './components/dashboard/EditProfile';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
    <BrowserRouter>
      <UserNavbar/>
      <AlertComp/>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path ="/login" element={<Login/>}/>
        <Route exact path ="/register" element={<Register/>}/>
        
        <Route exact path ="/dashboard" 
        element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>}/>

        <Route exact path ="/create-profile" 
        element={
        <PrivateRoute>
          <CreateProfile/>
        </PrivateRoute>}/>
        <Route exact path ="/edit-profile" 
        element={
        <PrivateRoute>
          <EditProfile/>
        </PrivateRoute>}/>
      </Routes>
      
    </BrowserRouter>
    </Provider>
  );
};

export default App;
