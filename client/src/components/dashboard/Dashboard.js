import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate, Route, useNavigate } from 'react-router-dom';
import { getProfile } from '../../actions/profile';
import CreateProfile from './CreateProfile';


const Dashboard = ({profile, auth, getProfile, ...props}) => {

  let navigate = useNavigate();
  useEffect(() => {
    getProfile();
  }, []);

  const handleNavigation = () => {
    navigate("/create-profile");
  }

  return (
    <div className="container">
      <h2>
        Welcome to DevSoc, {auth.user.name}
      </h2>
      {profile == null ? <Fragment>
        <h3>
          You haven't created a profile yet, Create now :
          
        </h3>
        <button onClick={() => handleNavigation()}>
            Creat Profile
        </button>
      </Fragment> 
      : 
      <Fragment>
        
      </Fragment>}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps, {getProfile})(Dashboard);