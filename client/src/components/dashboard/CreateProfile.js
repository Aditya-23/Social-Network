import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Navigate, useNavigate, withRouter} from 'react-router-dom'
import {createProfile} from '../../actions/profile'
import {removeAlert} from '../../actions/alert'

function CreateProfile(props) {


    const history = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        website: "",
        bio: "",
        company: "",
        github: "",
        skills: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        youtube: "",
        status: "",
    });

    const onChangeHandler = (e) => {
        console.log(e.target)
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await props.createProfile(formData, history);
    }

    if(!props.auth.isAuthenticated){
        return (
          <Navigate to="/login" />
        )
      }
    
    if(props.auth.loading){
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )
    }

    const alertCloseButton = () => {
        props.removeAlert();
    }

  return (
    <div className='container'>
        <div className="row">
            {props.alert.msg != null ? 
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {props.alert.msg}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => alertCloseButton()}></button>
                </div> : null}
            <h3>
            Please fill the form to create a profile! 
            </h3>
            <div className='col'>     
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <div className="mb-3">
                    <label  className="form-label">Full Name</label>
                    <input type="text" required className="form-control" onChange={(e) => onChangeHandler(e)} placeholder="Full name" name='fullName' value={formData.fullName} />
                    <div id="nameHelp" className="form-text">Firstname, Lastname</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <input type="text" required className="form-control" onChange={(e) => onChangeHandler(e)} name='bio' value={formData.bio}/>
                    <div id="bio" className="form-text">Add a catchy bio (Or nerdy, Don't worry, this is not a dating site!)</div>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Company</label>
                    <input type="text" className="form-control" onChange={(e) => onChangeHandler(e)} name='company' value={formData.company}/>
                    <div id="company" className="form-text">Your present employer.</div>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Website</label>
                    <input type="text" className="form-control" onChange={(e) => onChangeHandler(e)} name='website' value={formData.website}/>
                    <div id="website" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" required className="form-control" onChange={(e) => onChangeHandler(e)} name='email' value={formData.email}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Github Username</label>
                    <input type="github" required className="form-control" onChange={(e) => onChangeHandler(e)} name='github' value={formData.github}/>
                    <div id="github" className="form-text">Go on, Flaunt your projects!</div>
                </div>
                <div className="mb-3">
                    <select className="form-select" onChange={(e) => onChangeHandler(e)} name='status' value={formData.status}>
                        <option defaultValue={"Select your current status"}>Select your current status</option>
                        <option value="Student">Student</option>
                        <option value="Employed">Employed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label  className="form-label">Skills</label>
                    <input type="text" required className="form-control" onChange={(e) => onChangeHandler(e)} name='skills' value={formData.skills}/>
                    <div id="skills" className="form-text">Add your skills in a comma separated format!</div>
                </div>

                <div className="mb-3">
                    <label  className="form-label">Facebook</label>
                    <input type="text" className="form-control" onChange={(e) => onChangeHandler(e)} name='facebook' value={formData.facebook}/>
                    <div id="fb" className="form-text">Add your facebook URL!</div>
                </div>

                <div className="mb-3">
                    <label  className="form-label">Instagram</label>
                    <input type="text" className="form-control" onChange={(e) => onChangeHandler(e)} name='instagram' value={formData.instagram}/>
                    <div id="insta" className="form-text">Add your instagram URL!</div>
                </div>

                <div className="mb-3">
                    <label  className="form-label">LinkedIn</label>
                    <input type="text" required className="form-control" onChange={(e) => onChangeHandler(e)} name='linkedin' value={formData.linkedin}/>
                    <div id="linkedIn" className="form-text">Add your linkedin URL!</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Youtube</label>
                    <input type="text" className="form-control" onChange={(e) => onChangeHandler(e)} name='youtube' value={formData.youtube}/>
                    <div id="youtube" className="form-text">Add your youtube URL!</div>
                </div>

                <div className="mb-3">
                    <label  className="form-label">Twitter</label>
                    <input type="text" className="form-control" onChange={(e) => onChangeHandler(e)} required name='twitter' value={formData.twitter}/>
                    <div id="twitter" className="form-text">Add your twitter URL!</div>
                </div>

                
                <button type="submit" className="btn btn-primary">Create Profile</button>
            </form>
            </div>
            <div className='col'>
            </div>
        </div>
        
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
};

export default connect (mapStateToProps, {createProfile, removeAlert})(CreateProfile);