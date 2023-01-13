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

    return (
        <>
            <h1>Profiles</h1>
            <ul>
                {profilesToDisplay}
            </ul>
        </>
    );
}

const mapStateToProps = state => {
    return {
        profileReducer: state.profileReducer
    }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);
