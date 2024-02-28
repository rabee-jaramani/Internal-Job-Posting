import React, { useState } from 'react';
import Card from '../card/Card';
import { data } from '../data';
import FiltersForm from '../filters_form/FiltersForm';
import Spinner from '../spinner/Spinner';
export default function Cards() {
  const [searching, setSearching] = useState(false);
  const [listToBeRendered, setListToBeRendered] = useState(data);
  const [country_jobs, setCountry_jobs] = useState('');
  const original_list = data;
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
