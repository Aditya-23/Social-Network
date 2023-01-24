import React from 'react';

export default function Experiences(props) {

    const getDateFromDateTime = (str) => {
        return str.split("T")[0];
    }

    var experienceList = props.experience
        ? props
            .experience
            .map(exp => <tr>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{getDateFromDateTime(exp.from)}</td>
                <td>{getDateFromDateTime(exp.to)}</td>
            </tr>)
        : null;
    return (
        <div className='col-6'>
            <br></br>
            <div class="card">
                <div class="card-header">
                    Experiences
                </div>
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
                        {experienceList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
