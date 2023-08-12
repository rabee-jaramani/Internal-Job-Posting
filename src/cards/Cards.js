import React, { useState } from 'react';
import Card from '../card/Card';
import { data } from '../data';
import FiltersForm from '../filters_form/FiltersForm';
export default function Cards() {
  const [searching, setSearching] = useState(false)
  const [listToBeRendered, setListToBeRendered] = useState(data)
  const original_list = data
  return (
    <div className="cards-cont">
      <FiltersForm original_list={original_list} setListToBeRendered={setListToBeRendered} listToBeRendered={listToBeRendered} searching={searching} setSearching={setSearching} />
      <div className="cards-grid">
        {listToBeRendered.map((item) => {
          return <Card item={item} key={item.requisition_number} />;
        })}
      </div>
    </div>
  );
}
