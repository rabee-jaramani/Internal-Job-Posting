import React from 'react';
import Popup from 'reactjs-popup';
// import Form from '../form/Form';
import Form2 from '../form/Form2';

export default function Card(props) {
  const {
    requisition_number,
    job_title,
    department,
    location,
    recruiter_name,
    recruiter_email,
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
          <Popup
            trigger={<div className="apply-btn">Apply</div>}
            position="center center"
            modal
            nested
          >
            {(close) => (
              <div className="popup-cont">
                <div className="modal-content">
                  <div className="modal-items">
                    <div className="modal-item">
                      <strong>Requisition Number</strong> <br />
                      {requisition_number}
                    </div>
                    <div className="modal-item">
                      <strong>Job Title</strong> <br />
                      {job_title}
                    </div>
                    <div className="modal-item">
                      <strong>Department</strong> <br />
                      {department}
                    </div>
                    <div className="modal-item">
                      <strong>Location</strong>
                      <br />
                      {location}
                    </div>

                    <Form2 item={props.item} />
                  </div>
                </div>
                <div>
                  <div className="close-modal" onClick={() => close()}>
                    <i
                      className="fa-solid fa-xmark"
                      style={{ color: '#e60000' }}
                    ></i>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}
