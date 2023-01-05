import React from 'react';
import { connect } from 'react-redux';

function Experience(props) {

  const getDateString = (dateTimeStr) => {
    return dateTimeStr.split("T")[0]
  }

  const experiences = props.experiences.map(experience => (
    <tr>
      <td>{experience.company}</td>
      <td>{experience.title}</td>
      <td>{getDateString(experience.from)}</td>
      <td>{getDateString(experience.to)}</td>
    </tr>
  ))

  return (
    <div className='container'>
      {console.log(props.experiences)}
      <div className='row'>
        <div className='col-auto'>
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

export default Experience;