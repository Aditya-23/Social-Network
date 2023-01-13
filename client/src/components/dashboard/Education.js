import React from 'react';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

function Education(props) {

  const getDateString = (dateTimeStr) => {
    return dateTimeStr.split("T")[0]
  }

  const onDeleteHandler =  (id) => {
    props.deleteEducation(id);
 }

 if(props.educations == []){
  return null
 }
  const education = props.educations.map(ed => (
    <tr>
      <td>{ed.school}</td>
      <td>{ed.degree}</td>
      <td>{getDateString(ed.from)}</td>
      <td>{getDateString(ed.to)}</td>
      <td><button type='button' onClick={() => onDeleteHandler(ed._id)} className='btn btn-danger'>Delete</button></td>
    </tr>
  ))

  return (
    <div className='container'>
      <h2>
            Education
        </h2>
        <p>Add education to improve your profile</p>
      <div className='row'>
        <div className='col-8'>
          <table className='table'>
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {education}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    education: state.profileReducer.profile.education
  }
}

export default connect(mapStateToProps, {deleteEducation}) (Education);