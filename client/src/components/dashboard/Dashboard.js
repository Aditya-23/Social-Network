import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';


const Dashboard = ({profile, auth, getProfile, ...props}) => {

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>
        {console.log("Dashboard is here")}
        Dashboard
      </h1>
      <h2>
        Welcome {auth.user.name}
      </h2>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps, {getProfile})(Dashboard);