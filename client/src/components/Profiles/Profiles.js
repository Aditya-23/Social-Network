import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

function Profiles(props) {

    useEffect(() => {
        console.log("Profiles useeffect called")
        props.getProfiles();
    }, []);

    var profilesToDisplay;
    if(props.profileReducer.profiles != null){
        profilesToDisplay = props.profileReducer.profiles.map(prof => 
            <ProfileItem profile={prof} />
        )
    }

    if(props.profileReducer.loading){
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <div className='container'>
            <h2>Developers around you : </h2>
            <ul>
                {profilesToDisplay}
            </ul>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profileReducer: state.profileReducer
    }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);
