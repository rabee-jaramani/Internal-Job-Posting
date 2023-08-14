import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Error from './Error';
import styled from '@emotion/styled';
import axios from 'axios';
import Spinner from '../spinner/Spinner';

export default function Form2(props) {
  const {
    requisition_number,
    job_title,
    department,
    location,
    // recruiter_name,
    recruiter_email,
  } = props.item;

  const BootstrapButton = styled(Button)({
    backgroundColor: '#673ab7',
    '&:hover': {
      backgroundColor: '#673ab7',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#673ab7',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
  const [sent, setSent] = useState(false)
  const [errorSending, setErrorSending] = useState(false)
  const [sending, setSending] = useState(false)
  const [country, setCountry] = useState('');
  const [employee_number, setEmployeeNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({
    countryErr: null,
    nameErr: null,
    employeeNumberErr: null,
    emailErr: null,
    fileErr: null,
  });
  const [attachment, setAttachment] = useState(null);
  // values handles functions

  // Handle Country
  const handleCountry = (value) => {
    setErrors({ ...errors, countryErr: "" })
    setCountry(value);
  };

  // Handle Employee Number
  const handleEmployeeNumber = (value) => {
    if (value.length > 6) {
      setErrors({ ...errors, employeeNumberErr: "Number is too long" })
      setEmployeeNumber(value);
    }
    else {
      setErrors({ ...errors, employeeNumberErr: "" })
      setEmployeeNumber(value);
    }
  };
  const handleName = (value) => {
    if (value.length > 30) {
      setErrors({ ...errors, nameErr: "Name is too long" })
      setName(value);
    }
    else {
      setErrors({ ...errors, nameErr: "" })
      setName(value);
    }

  };

  // Handle Email
  const handleEmail = (value) => {
    console.log(value)
    if (validateEmail(value)) {
      if (value.toString().length > 50) {
        console.log('value.toString().length', value.toString().length)
        setErrors({ ...errors, emailErr: 'Email is too long' })
        setEmail(value);
      }
      else {
        setErrors({ ...errors, emailErr: "" })
        setEmail(value);
      }
    }
    else {
      setErrors({ ...errors, emailErr: 'Not a valid email address' });
      setEmail(value);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleFile = (e) => {

    let file = document.getElementById('file').files[0];
    try {
      if (file.size > 2000000) {
        setErrors({ ...errors, fileErr: 'File size is greater than 2MB' });
        document.getElementById('file').value = null;
      } else {
        setFileName(file.name);
        setErrors({ ...errors, fileErr: '' });
        setAttachment(e.target.files[0]);
        console.log('attachement', attachment)
      }
    } catch (error) {
      setErrors({ ...errors, fileErr: "Please choose a file to upload" })
    }

  };
  ///////////////// Submit
  const handleSubmit = async () => {
    setSending(true)
    // let file = document.getElementById('file').files[0];
    // check the file if still empty
    if (errors.fileErr === null || errors.fileErr === 'Upload your CV') {
      setErrors({ ...errors, fileErr: "Upload your CV" })
    }
    else setErrors({ ...errors, fileErr: "" })
    // check tere is no errors
    if (
      errors.emailErr === "" &&
      errors.fileErr === "" &&
      errors.nameErr === "" &&
      errors.employeeNumberErr === ""
    ) {
      console.log(document.getElementById('file').files[0])
      console.log("ALL GOOD >>>>>>>>>>>>>>>>>")
      const formData = new FormData();
      formData.append('to', recruiter_email);
      formData.append('subject', 'Job Title: ' + job_title);
      formData.append('text',
        'Job Title: ' + job_title +
        'requisition_number: ' + requisition_number +
        'department: ' + department +
        'location: ' + location);
      formData.append('attachment', attachment);

      try {
        await axios.post('http://localhost:5000/send-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSent(true)
        setSending(false)
        setErrorSending(false)
        // alert('Email sent successfully');
      } catch (error) {
        setSending(false)
        setErrorSending(true)
        console.error('Error sending email:', error);
        // alert('Error sending email');
      }
    }
    else {
      console.log('fields errors', errors)
    }
  };
  useEffect(() => {
  }, [name]);
  return (
    <div className="form-cont">
      <form className="form" onSubmit={handleSubmit}>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-label">
            Country of Employment
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            size="small"
            id="country"
            name="country"
            label="Country"
            value={country}
            onChange={(e) => handleCountry(e.target.value)}
            required
          >
            <MenuItem value="UAE">UAE</MenuItem>
            <MenuItem value="KSA">KSA</MenuItem>
            <MenuItem value="QATAR">QATAR</MenuItem>
            <MenuItem value="OMAN">OMAN</MenuItem>
            <MenuItem value="KUWAIT">KUWAIT</MenuItem>
            <MenuItem value="BAHRAIN">BAHRAIN</MenuItem>
            <MenuItem value="INDIA">INDIA</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField
            variant="filled"
            fullWidth
            size="small"
            id="employee_number"
            name="employee_number"
            label="Employee Number"
            value={employee_number}
            onChange={(e) => handleEmployeeNumber(e.target.value)}
            required
            type='number'
          />
          <Error error={errors.employeeNumberErr} />
        </div>
        <div>
          <TextField
            variant="filled"
            fullWidth
            size="small"
            id="name"
            name="name"
            label="Employee Name"
            value={name}
            onChange={(e) => handleName(e.target.value)}
            required
          />
          <Error error={errors.nameErr} />
        </div>
        <div>
          <TextField
            variant="filled"
            fullWidth
            size="small"
            id="email"
            name="email"
            label="Email ID"
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
            required
          />
          <Error error={errors.emailErr}></Error>
        </div>
        <div>
          <input
            accept="application/pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="file"
            name="file"
            type="file"
            onChange={handleFile}
            required
          />
          <label htmlFor="file">
            <BootstrapButton variant="contained" component="span">
              Upload your cv
            </BootstrapButton>
            <br />
            {errors.fileErr ? (
              <Error error={errors.fileErr} />
            ) : (
              <span>{fileName}</span>
            )}
          </label>
        </div>
        {sending ?
          <Spinner size={30} /> :
          (
            sent ?
              <p style={{ fontSize: '14px', color: '#00720f', width: '100%', padding: '5px', backgroundColor: '#c0fcae' }}>Your Mail sent successfully</p> :
              <div>
                <Button variant="contained" fullWidth onClick={handleSubmit}
                  disabled={
                    errors.countryErr === "" &&
                      errors.emailErr === "" &&
                      errors.fileErr === "" &&
                      errors.nameErr === "" &&
                      errors.employeeNumberErr === ""
                      ? false
                      : true
                  }
                >
                  Submit
                </Button>
                {errorSending ? <Error error={'Something went wrong, try again later.'} /> : ''}
              </div>
          )}

      </form>
      <div className="note">{`Please note: If the requisition belongs to GCC and you are applying from GCC , 
        then you should login to oracle and follow the navigation Menu > Current Jobs > Search for requisition and apply.`}</div>
    </div>
  );
}
