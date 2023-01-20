import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfileItem({profile}) {
    var skills;
    if (profile.skills != []) {
        skills = profile
            .skills
            .map(skill => <li>{skill}</li>)
    }
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='col col-6' >
                <div className="card mb-3">
                    <div className="row g-0" style={{height: 200}}>
                        <div className="col-md-4">
                            <img src={profile.avatar} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        
                        <div className="col-md-4">
                            <div className='card-body'>
                            <h5 className="card-title">{profile.fullName}</h5>
                            
                            <div className='row'>
                                <div className='col'>
                                    <p>{profile.bio}</p>
                                </div>
                            </div>
                            <br>
                            </br>
                            <div className='row'>
                                <div className='col'>
                                    <Link to={"/profile/" + profile.user}><button className='btn btn-success'>View Profile</button></Link>
                                </div>
                            </div>
                        </div>
                            
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <h5 className="card-title">Skills</h5>
                                <>
                                    <ol>
                                        {skills}
                                    </ol>
                                </>
                                
                            </div>
                        <br></br>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}