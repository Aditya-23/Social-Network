import React from 'react'

function CreateProfile() {

  return (
    <div className='container'>
        <div className="row">
            <h3>
            Please fill the form to create a profile! 
            </h3>
            <div className='col'>     
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Full Name</label>
                    <input type="text" className="form-control" id="nameInput" aria-describedby="name"/>
                    <div id="nameHelp" className="form-text">Firstname, Lastname</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Bio</label>
                    <input type="text" className="form-control" id="bioInput" aria-describedby="bio"/>
                    <div id="bio" className="form-text">Add a catchy bio (Or nerdy, Don't worry, this is not a dating site!)</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Company</label>
                    <input type="text" className="form-control" id="comanyInput" aria-describedby="company"/>
                    <div id="company" className="form-text">Your present employer.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Website</label>
                    <input type="text" className="form-control" id="websiteInput" aria-describedby="website"/>
                    <div id="website" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Github Username</label>
                    <input type="github" className="form-control" id="gitInput" aria-describedby="github"/>
                    <div id="github" className="form-text">Go on, Flaunt your projects!</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Select your current status</option>
                        <option value="Student">Student</option>
                        <option value="Employed">Employed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Skills</label>
                    <input type="text" className="form-control" id="skillsInput" aria-describedby="skills"/>
                    <div id="skills" className="form-text">Add your skills in a comma separated format!</div>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Facebook</label>
                    <input type="text" className="form-control" id="fbInput" aria-describedby="fb"/>
                    <div id="fb" className="form-text">Add your facebook URL!</div>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Instagram</label>
                    <input type="text" className="form-control" id="gitInput" aria-describedby="insta"/>
                    <div id="insta" className="form-text">Add your instagram URL!</div>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">LinkedIn</label>
                    <input type="text" className="form-control" id="gitInput" aria-describedby="linkedIn"/>
                    <div id="linkedIn" className="form-text">Add your linkedin URL!</div>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Youtube</label>
                    <input type="text" className="form-control" id="gitInput" aria-describedby="youtube"/>
                    <div id="youtube" className="form-text">Add your youtube URL!</div>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Twitter</label>
                    <input type="text" className="form-control" id="gitInput" aria-describedby="twitter"/>
                    <div id="twitter" className="form-text">Add your twitter URL!</div>
                </div>

                
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
            </div>
            <div className='col'>

            </div>
        </div>

        
    </div>
  )
}

export default CreateProfile;