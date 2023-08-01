import React from 'react';
import banner_img from '../assets/banner_img.webp';
export default function Banner() {
  return (
    <div className="banner-cont">
      <img src={banner_img} alt="Internal Job Posting" />
    </div>
  );
}
