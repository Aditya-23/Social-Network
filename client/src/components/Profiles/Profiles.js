import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

function Profiles(props) {

    useEffect(() => {
        console.log("Profiles useeffect called")
        props.getProfiles();
    }, []);

    return (
        <>
            <h1>Profiles</h1>
        </>
    );
}

const mapStateToProps = state => {
    return {
        profileReducer: state.profileReducer
    }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);
