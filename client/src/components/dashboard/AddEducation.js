import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {addEducation} from "../../actions/profile"
import {removeAlert} from "../../actions/alert"

function AddEducation(props) {

    const [formData,
        setFormData] = useState({school: "", degree: "", from: "", to: "", fieldofstudy: ""})

    const onChangeHandler = (e) => {
        console.log(e.target)
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        });
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        await props.addEducation(formData);
    }

    const alertCloseButton = () => {
        props.removeAlert();
    }

    return (
        <div className='container'>
            <div className="row">
                {props.alert.msg != null
                    ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {props.alert.msg}
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => alertCloseButton()}></button>
                        </div>
                    : null}
                <h3>
                    Add education here
                </h3>
                <div className='col'>
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className="mb-3">
                            <label className="form-label">School</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="School"
                                name='school'
                                value={formData.school}/>
                            <div id="nameHelp" className="form-text">Undergraduate or above</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Degree</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                name='degree'
                                value={formData.degree}/>
                            <div id="degree" className="form-text">Degree name</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">From</label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                name='from'
                                value={formData.from}/>
                            <div id="from" className="form-text">Approximate start date</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">To</label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                name='to'
                                value={formData.to}/>
                            <div id="to" className="form-text">Approximate end date</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Field of study</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                name='fieldofstudy'
                                value={formData.fieldofstudy}/>
                            <div id="field" className="form-text">Field of study</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
                <div className='col'></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {auth: state.auth, alert: state.alertReducer}
}

export default connect(mapStateToProps, {addEducation, removeAlert})(AddEducation);