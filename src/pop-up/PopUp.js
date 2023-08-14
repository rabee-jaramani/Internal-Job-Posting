import React from 'react'
import Popup from 'reactjs-popup'
import Form2 from '../form/Form2'

export default function PopUp(props) {
    const {
        requisition_number,
        job_title,
        department,
        location,
        // recruiter_name,
        // recruiter_email,
    } = props.item;
    return (
        <div>
            <Popup
                trigger={<div className="apply-btn">Apply</div>}
                position="center center"
                modal
                nested
            >
                {(close) => (
                    <div className="popup-cont">
                        <div className="popuo-header" style={{ "fontSize": "14px" }}>{requisition_number} {job_title}</div>
                        <div className="popuo-space"></div>

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
    )
}
