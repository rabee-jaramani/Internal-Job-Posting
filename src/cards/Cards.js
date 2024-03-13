
import Card from '../card/Card';
import FiltersForm from '../filters_form/FiltersForm';
import Spinner from '../spinner/Spinner';
import React, { useState } from 'react';

export default function Cards({data,isGCC}) {
  const [searching, setSearching] = useState(false);
  const [country_jobs, setCountry_jobs] = useState(data);
  const [original_list,setOriginal_list]=useState(data)
  const [listToBeRendered, setListToBeRendered] = useState(data);
// console.log('listToBeRendered',listToBeRendered)
  return (
    <div className="cards-cont">
      <FiltersForm
        original_list={original_list}
        setListToBeRendered={setListToBeRendered}
        listToBeRendered={listToBeRendered}
        searching={searching}
        setSearching={setSearching}
        country_jobs={country_jobs}
        setCountry_jobs={setCountry_jobs}
        isGCC={isGCC}
      />
      {searching ? (
        <Spinner />
      ) : (
        <div className="cards-grid">
          {listToBeRendered.length < 1 ? (
            <p className="no-results">
              Recently, no jobs available in <strong>{country_jobs}</strong>.<br />
              <br />
              <span
                style={{
                  color: '#C8CFE3',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => window.location.reload()}
              >
                Refresh the page
              </span>
            </p>
          ) : (
            listToBeRendered.map((item) => {
              return <Card item={item} key={item.requisition_number} />;
            })
         
          )}
          {/* {listToBeRendered.map((item) => {
            return <Card item={item} key={item.requisition_number} />;
          })} */}
        </div>
      )}
    </div>
  );
}
