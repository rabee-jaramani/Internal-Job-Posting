import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

export default function FiltersForm(props) {
  const searching = props.searching;
  const setSearching = props.setSearching;
  const setListToBeRendered = props.setListToBeRendered;
  const listToBeRendered = props.listToBeRendered;
  const original_list = props.original_list;
  const [country, setCountry] = useState('all');
  const [job_title, setJob_title] = useState('all');
  const [job_title_list, setJob_title_list] = useState(listToBeRendered);

  const filterByCountry = (listToBeFiltered) => {
    console.log('listToBeFiltered', listToBeFiltered);

    if (country !== 'all') {
      let temp_list = listToBeFiltered.filter((e) => {
        console.log(e.location);
        return e.location.toLowerCase().includes(country.toLowerCase());
      });
      return filterByJobTitle(temp_list);
      // return temp_list;
    } else {
      return filterByJobTitle(listToBeFiltered);
      // return listToBeFiltered;
    }
  };

  const filterByJobTitle = (listToBeFiltered) => {
    if (job_title !== 'all') {
      let temp_list = listToBeFiltered.filter((e) => {
        return e.job_title.toLowerCase() === job_title.toLowerCase();
      });
      setSearching(false);
      return temp_list;
    } else {
      setSearching(false);
      return listToBeFiltered;
    }
  };
  const setListToRender = (list) => {
    setListToBeRendered(filterByCountry(list));
  };

  const handleSubmit = () => {
    setSearching(true);
    setTimeout(() => {
      setListToRender(original_list);
    }, 1000);
  };
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  useEffect(() => {
    setJob_title_list(removeDuplicates(listToBeRendered));
  }, [listToBeRendered]);

  return (
    <>
      <div className="filters-form-cont" id="serach_form">
        <FormControl fullWidth>
          <InputLabel>BY LOCATION</InputLabel>
          <Select
            value={country}
            label="BY COUNTRY"
            onChange={(e) => setCountry(e.target.value)}
            disabled={searching ? true : false}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="UAE">UAE</MenuItem>
            <MenuItem value="QATAR">QATAR</MenuItem>
            <MenuItem value="KSA">KSA</MenuItem>
            <MenuItem value="KUWAIT">KUWAIT</MenuItem>
            <MenuItem value="OMAN">OMAN</MenuItem>
            <MenuItem value="BAHRAIN">BAHRAIN</MenuItem>
            <MenuItem value="BAHRAIN">INDIA</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>BY JOB TITLE</InputLabel>

          <Select
            value={job_title}
            label="BY ROLE TYPE"
            onChange={(e) => setJob_title(e.target.value)}
            disabled={searching ? true : false}
          >
            <MenuItem value="all">All</MenuItem>
            {job_title_list.map((e) => {
              return (
                <MenuItem key={e.requisition_number} value={e.job_title}>
                  {e.job_title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          disabled={searching ? true : false}
          onClick={handleSubmit}
          variant="contained"
        >
          SEARCH
        </Button>
      </div>
    </>
  );
}
