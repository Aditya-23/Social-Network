import React from 'react';

export default function Education(props) {

    const getDateFromDateTime = (str) => {
        return str.split("T")[0];
    }

    const educationList = props.education
        ? props
            .education
            .map(ed => <tr>
                <td>{ed.school}</td>
                <td>{ed.degree}</td>
                <td>{getDateFromDateTime(ed.from)}</td>
                <td>{getDateFromDateTime(ed.to)}</td>
            </tr>)
        : null;
    return (
        <div className='col-10 profile-style'>
            <br></br>
            <div class="card text-center">
                <div class="card-header">
                    Education
                </div>
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
                        {educationList}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
