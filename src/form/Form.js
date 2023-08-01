import * as yup from 'yup';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export default function Form(props) {
  const fileRef = useRef(null);
  const validationSchema = yup.object({
    country: yup
      .string('Enter the country apply to')
      //   .country('Enter a valid email')
      .required('Country is required'),
    employee_number: yup
      .number('Enter your employee number')
      .lessThan(999999)
      .moreThan(11111)
      .required('Employee number is required'),
    name: yup
      .string('Enter your employee name')
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Employee name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .matches(
        // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Enter a valid email'
      )
      .required('Email is required'),
    file: yup
      .mixed()
      .required('Required')
      .test('is-file-too-big', 'File exceeds 10MB', () => {
        let valid = true;
        const file = fileRef?.current?.file;
        console.log('FILE', fileRef);
        if (file) {
          const size = file.size / 1024 / 1024;
          if (size > 10) {
            valid = false;
          }
        }
        return valid;
      })
      .test('is-file-of-correct-type', 'File is not of supported type', () => {
        let valid = true;
        const file = fileRef?.current?.file;
        if (file) {
          const type = file.type.split('/')[1];
          const validTypes = ['pdf', 'doc', 'docx'];
          if (!validTypes.includes(type)) {
            valid = false;
          }
        }
        return valid;
      }),
  });

  const formik = useFormik({
    initialValues: {
      country: '',
      employee_number: '',
      name: '',
      email: '',
      file: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="form-cont">
      <form className="form" onSubmit={formik.handleSubmit}>
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
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
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
          value={formik.values.employee_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.employee_number &&
            Boolean(formik.errors.employee_number)
          }
          helperText={
            formik.touched.employee_number && formik.errors.employee_number
          }
        />
        <TextField
          variant="filled"
          fullWidth
          size="small"
          id="name"
          name="name"
          label="Employee Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          variant="filled"
          fullWidth
          size="small"
          id="email"
          name="email"
          label="Email ID"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <input
          accept="application/pdf,.doc,.docx"
          style={{ display: 'none' }}
          id="file"
          name="file"
          type="file"
          onChange={formik.handleChange}
          ref={fileRef}
        />
        <label htmlFor="file">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
