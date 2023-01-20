import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProfileById} from '../../actions/profile';

function Profile(props) {

    let {id} = useParams();
    const {
        fullName,
        bio,
        status
    } = props.profileReducer.profile

    useEffect(() => {
        props.getProfileById(id);
    }, [])

    return (
        <div className='container profile-style'>
            <div className='row'>
                <div className='col-6'>
                    <br></br>
                    <div class="card text-center">
                        <div class="card-header">
                            Basic Information
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{fullName}</h5>
                            <p class="card-text">{bio}</p>
                            <p class="card-text">Currently : {status}</p>
                        </div>

                    </div>
                </div>
                {/* Put experience component here  */}
                <div className='col-6'>
                    <br></br>
                    <div class="card text-center">
                        <div class="card-header">
                            Experiences
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{fullName}</h5>
                            <p class="card-text">{bio}</p>
                            <p class="card-text">Currently : {status}</p>
                        </div>

                    </div>
                </div>
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
