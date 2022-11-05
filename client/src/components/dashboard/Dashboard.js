import React, { Fragment, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Navigate, Route, useNavigate } from 'react-router-dom';
import { getProfile } from '../../actions/profile';
import CreateProfile from './CreateProfile';


const Dashboard = ({profileReducer, auth, getProfile, ...props}) => {

  let navigate = useNavigate();
  useEffect( () => {
   getProfile();
  }, []);

  const handleNavigation = () => {
    if(profileReducer.profile){
      navigate("/edit-profile");
    }else{
      navigate("/create-profile");
    }
    
  }
  if(profileReducer.loading || auth.loading){
    return (<Fragment>
      <Spinner/>
    </Fragment>)
  }
  return (
    <div className="container">
      <h2>
        Welcome to DevSoc, {auth.user.name}
      </h2>
      {profileReducer.profile == null ? <Fragment>
        <h3>
          You haven't created a profile yet, Create now :
          
        </h3>
        <button onClick={() => handleNavigation()}>
            Create Profile
        </button>
      </Fragment> 
      : 
      <Fragment>
        <button onClick={() => handleNavigation()}>
            Edit Profile
        </button>
      </Fragment>}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profileReducer: state.profileReducer,
});

export default connect(mapStateToProps, {getProfile})(Dashboard);