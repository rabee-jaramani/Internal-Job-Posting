import React, { useState, useEffect } from 'react';
import Banner from './banner/Banner';
import Cards from './cards/Cards';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import './style.sass';
import to_top from './assets/back-to-top-icon.webp';
import { dataFromFile } from './data';
import Spinner from './spinner/Spinner';

function App() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [isGCC, setIsGCC] = useState(false)
  const fetchLocation = () => {
    // Get user's location using Geolocation API
    try {
      
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // GCC latitude and longitude possibilities
        if ((latitude >= 16 && longitude >= 34) && (latitude <= 28 && longitude <= 60)) {
          setData(dataFromFile.filter(item => item.location.toLocaleLowerCase().includes('india')));
          console.log('You are in GCC');
          setIsGCC(true)
        } else {
          setData(dataFromFile);
          console.log('You are NOT in GCC');
        }
        setLoading(false); // Set loading to false once location data is fetched
      });
    } catch (error) {
      alert("something went wrong")
    }
  }
  useEffect(() => {
    fetchLocation();
  }, []);

  if (loading) {
        
        return <div className="App"><Spinner /></div>; // Render loading state while waiting for location data
  }

  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Cards data={data} isGCC={isGCC}/>
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
