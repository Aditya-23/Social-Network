import React from 'react';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

function Experience(props) {

  const getDateString = (dateTimeStr) => {
    return dateTimeStr.split("T")[0]
  }

  const onDeleteHandler =  (id) => {
     props.deleteExperience(id);
  }


  const experiences = props.experiences.map(experience => (
    <tr>
      <td>{experience.company}</td>
      <td>{experience.title}</td>
      <td>{getDateString(experience.from)}</td>
      <td>{getDateString(experience.to)}</td>
      <td><button type='button' onClick={() => onDeleteHandler(experience._id)} className='btn btn-danger'>Delete</button></td>
    </tr>
  ))

  return (
    <div className='container'>
        <h2>
            Experiences
        </h2>
        <p>Add experiences to improve your profile</p>
      <div className='row'>
        <div className='col-8'>
          <table className='table'>
            <thead>
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {experiences}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect (null, {deleteExperience})(Experience);