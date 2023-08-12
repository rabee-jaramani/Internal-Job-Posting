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

export default function Form2(props) {
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
  const [country, setCountry] = useState('');
  const [employee_number, setEmployeeNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({
    countryErr: '',
    fileErr: '',
  });
  // values handles functions
  const handleCountry = (value) => {
    setCountry(value);
  };
  const handleEmployeeNumber = (value) => {
    setEmployeeNumber(value);
  };
  const handleName = (value) => {
    setName(value);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handleFile = (e) => {
    let file = document.getElementById('file').files[0];
    if (file.size > 2000000) {
      setErrors({ ...errors, fileErr: 'File size is greater than 2MB' });
      document.getElementById('file').value = null;
    } else {
      setFileName(file.name);
    }
  };
  ///////////////// Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let file = document.getElementById('file').files[0];
    console.log('file is ', file);
  };
  useEffect(() => {
    console.log(country);
  }, [country]);
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
        />
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
          {fileName ? (
            <span>{fileName}</span>
          ) : (
            <Error error={errors.fileErr} />
          )}
        </label>
        <Button variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      <div className="note">{`Please note: If the requisition belongs to GCC and you are applying from GCC , 
        then you should login to oracle and follow the navigation Menu > Current Jobs > Search for requisition and apply.`}</div>
    </div>
  );
}
