import React, {Fragment, useEffect} from 'react';
import {Spinner} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, Navigate, Route, useNavigate} from 'react-router-dom';
import {getProfile} from '../../actions/profile';
import CreateProfile from './CreateProfile';
import Experience from './Experience';

const Dashboard = ({
    profileReducer,
    auth,
    getProfile,
    ...props
}) => {

    let navigate = useNavigate();
    useEffect(() => {
        getProfile();
    }, []);

    const handleNavigation = (nav) => {
        if (profileReducer.profile) {
            navigate("/edit-profile");
        } else {
            navigate("/create-profile");
        }

    }
    if (profileReducer.loading || auth.loading) {
        return (
            <Fragment>
                <Spinner/>
            </Fragment>
        )
    }
    return (
        <div className="container">
            <h2>
                Welcome to DevSoc, {auth.user.name}
            </h2>
            {profileReducer.profile == null
                ? <Fragment>
                        <h3>
                            You haven't created a profile yet, Create now :

                        </h3>
                        <button onClick={() => handleNavigation()}>
                            Create Profile
                        </button>
                    </Fragment>
                : <Fragment>
                    <div className='container'>
                        <div className='row justify-content-start'>
                            <div className='col-2'>
                                <button className='btn btn-success' onClick={() => handleNavigation()}>
                                    View Profile
                                </button>
                            </div>
                            <div className='col-2'>
                                <button className='btn btn-success' onClick={() => handleNavigation()}>
                                    Edit Profile
                                </button>
                            </div>
                            <div className='col-2'>
                                <button className='btn btn-success' onClick={() => navigate("/add-education")}>
                                    Add education
                                </button>
                            </div>
                            <div className='col-2'>
                                <button className='btn btn-success' onClick={() => navigate("/add-experience")}>
                                    Add experience
                                </button>
                            </div>

                        </div>

                    </div>

                </Fragment>
        }
        <br></br>
        <h2>
            Experiences
        </h2>
        <Experience/>
        </div>
    )
}

const mapStateToProps = state => ({auth: state.auth, profileReducer: state.profileReducer});

export default connect(mapStateToProps, {getProfile})(Dashboard);