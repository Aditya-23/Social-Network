import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {addExperience} from "../../actions/profile"
import {removeAlert} from "../../actions/alert"

function AddExperience(props) {

    const [formData,
        setFormData] = useState({
        title: "",
        company: "",
        from: "",
        to: "",
        location: "",
        current: false,
        description: ""
    })

    const onChangeHandler = (e) => {
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        });
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        await props.addExperience(formData);
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
                                className="btn-close"
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
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Title"
                                name='title'
                                value={formData.title}/>
                            <div id="nameHelp" className="form-text">Title</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Company</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                name='company'
                                value={formData.company}/>
                            <div id="degree" className="form-text">Company name</div>
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
                        <div className="mb-3 container">
                            <div className='row'>
                                <div className='col-auto'>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                        e.target.checked
                                            ? setFormData({
                                                ...formData,
                                                current: true
                                            })
                                            : setFormData({
                                                ...formData,
                                                current: false
                                            })
                                    }}
                                        name='current'
                                        value={formData.current}/>
                                </div>
                                <div className='col-auto'>
                                    <label className="form-label">Is this your current job?</label>
                                </div>
                            </div>

                        </div>
                        <div className="mb-3">
                            <label className="form-label">To</label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                disabled={formData.current}
                                onChange={(e) => onChangeHandler(e)}
                                name='to'
                                value={formData.to}/>
                            <div id="to" className="form-text">Approximate end date</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="textarea"
                                required
                                className="form-control"
                                onChange={(e) => onChangeHandler(e)}
                                name='description'
                                value={formData.description}/>
                            <div id="description" className="form-text">Description</div>
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

export default connect(mapStateToProps, {addExperience, removeAlert})(AddExperience);