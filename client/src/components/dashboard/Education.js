import React from 'react';
import { connect } from 'react-redux';

function Education(props) {

  const getDateString = (dateTimeStr) => {
    return dateTimeStr.split("T")[0]
  }

  const education = props.education.map(ed => (
    <tr>
      <td>{ed.school}</td>
      <td>{ed.degree}</td>
      <td>{getDateString(ed.from)}</td>
      <td>{getDateString(ed.to)}</td>
    </tr>
  ))

  return (
    <div className='container'>
      {console.log(props.experiences)}
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

export default Education;