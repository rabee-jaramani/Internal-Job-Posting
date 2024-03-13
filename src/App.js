import React, { useState } from 'react';
import Banner from './banner/Banner';
import Cards from './cards/Cards';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import './style.sass';
import to_top from './assets/back-to-top-icon.webp';
import { dataFromFile } from './data';

function App() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [data, setData] = useState([]);
  const [isGCC, setIsGCC] = useState(null);

  const handleLocationResponse = (response) => {
    if (response.toLowerCase() === 'yes') {
      // User's location is in GCC
      setIsGCC(true);
      setData(dataFromFile.filter(item => item.location.toLowerCase().includes('india')));
    } else if (response.toLowerCase() === 'no') {
      // User's location is not in GCC
      setIsGCC(false);
      setData(dataFromFile);
    } else {
      // Invalid response
      alert('Please click either "Yes" or "No".');
      setIsGCC(false); // Assume not in GCC
      setData(dataFromFile);
    }
  };

  if (isGCC === null) {
    // Ask the user if their location is in the GCC
    return (
      <div className="App">
        <Navbar />
        <Banner />
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'40px 10px'}}>
          <p>Are you located in GCC?</p>
          <div style={{display:'flex',gap:'10px'}}>
          <button style={{padding:'10px 15px'}} onClick={() => handleLocationResponse('yes')}>Yes</button>
          <button style={{padding:'10px 15px'}} onClick={() => handleLocationResponse('no')}>No</button>
          </div>
        </div>
        <Footer />
        <img
          onClick={toTop}
          width={40}
          className="to-top"
          src={to_top}
          alt="to-top"
          id="toTop"
        />
      </div>
    );
  }

  // Render the app based on user's location
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Cards data={data} isGCC={isGCC} />
      <Footer />
      <img
        onClick={toTop}
        width={40}
        className="to-top"
        src={to_top}
        alt="to-top"
        id="toTop"
      />
    </div>
  );
}

export default App;
