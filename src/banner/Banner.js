import React from 'react';
// import banner_img from '../assets/banner_img.webp';
import banner_img_1 from '../assets/banner_img_1.webp';
export default function Banner() {
  return (
    <div className="banner-cont">
      <img src={banner_img_1} alt="Internal Job Posting" />
      <h2>INTERNAL JOB POSTING</h2>
    </div>
  );
}
