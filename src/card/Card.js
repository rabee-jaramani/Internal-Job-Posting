import React from 'react';
import PopUp from '../pop-up/PopUp';

export default function Card(props) {
  const {
    requisition_number,
    job_title,
    department,
    location,
    // recruiter_name,
    // recruiter_email,
  } = props.item;
  return (
    <div className="card-cont">
      <div className="card-items">
        <div className="card-item">
          <strong>Requisition Number</strong> <br />
          {requisition_number}
        </div>
        <div className="card-item">
          <strong>Job Title</strong> <br />
          {job_title}
        </div>
        <div className="card-item">
          <strong>Department</strong> <br />
          {department}
        </div>
        <div className="card-item">
          <strong>Location</strong>
          <br />
          {location}
        </div>
        <div className="card-item">
          <PopUp item={props.item} />
        </div>
      </div>
    </div>
  );
}
