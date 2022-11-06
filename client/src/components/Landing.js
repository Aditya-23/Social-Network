import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Landing(props) {

  const navigate = useNavigate();

  if(props.auth.isAuthenticated){
    return (
      navigate("/dashboard")
    )
  }
  return (
    <div>
        <h1>
            Landing
        </h1>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, {}) (Landing);