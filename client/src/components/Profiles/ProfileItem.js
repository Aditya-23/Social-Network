import React, { Fragment } from 'react';

export default function ProfileItem({profile}) {
    var skills;
    if (profile.skills != []) {
        skills = profile
            .skills
            .map(skill => <li>{skill}</li>)
    }
    return (
        <div className='container'>
            <div className='col col-6' >
                <div className="card mb-3">
                    <div className="row g-0" style={{height: 250}}>
                        <div className="col-md-4">
                            <img src={profile.avatar} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{profile.fullName}</h5>
                                <>
                                    <ol>
                                        {skills}
                                    </ol>
                                </>
                                {/* <p class="card-text">
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
