import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProfileById} from '../../actions/profile';
import Experiences from './Experiences';

function Profile(props) {

    let {id} = useParams();
    if (props.profileReducer.profile) {
        var {fullName, bio, status, skills, avatar, experience} = props.profileReducer.profile
    }

    var skillsList = skills ? skills.map(skill => <li>{skill}</li>) : null;

    useEffect(() => {
        props.getProfileById(id);
    }, [])

    if (!props.profileReducer.profile) {
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <div className='container profile-style'>
            <div className='row'>
                <div className='col-6'>
                    <br></br>
                    <div class="card">
                        <div class="card-header">
                            Basic Information
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <img src={avatar} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div className='col'>
                                <div className='card-body'>
                                    <h5 class="card-title">{fullName}</h5>
                                    <p class="card-text">{bio}</p>
                                    <p class="card-text">Currently : {status}</p>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='card-body'>
                                    <h5 class="card-title">Skills</h5>
                                    <ol>
                                        {skillsList}
                                    </ol>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {/* Put experience component here  */}
                <Experiences experience={experience}/>
            </div>
            {/* put education component here  */}
            <div className='row'>
                <div className='col-10 profile-style'>
                    <br></br>
                    <div class="card text-center">
                        <div class="card-header">
                            Education
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{fullName}</h5>
                            <p class="card-text">{bio}</p>
                            <p class="card-text">Currently : {status}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* put github component here  */}
            <div className='row'>
                <div className='col-10 profile-style'>
                    <br></br>
                    <div class="card text-center">
                        <div class="card-header">
                            Github repos
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{fullName}</h5>
                            <p class="card-text">{bio}</p>
                            <p class="card-text">Currently : {status}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = state => {
    return {profileReducer: state.profileReducer}
}

export default connect(mapStateToProps, {getProfileById})(Profile)
