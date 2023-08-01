import React from 'react';
import Card from '../card/Card';
import { data } from '../data';
export default function Cards() {
  return (
    <div className="cards-cont">
      <div className="cards-grid">
        {data.map((item) => {
          return <Card item={item} key={item.requisition_number} />;
        })}
      </div>
    </div>
  );
}
