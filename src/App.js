// import Popup from 'reactjs-popup';
import Banner from './banner/Banner';
import Cards from './cards/Cards';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import './style.sass';
import to_top from './assets/back-to-top-icon.webp';
function App() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Cards />
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
