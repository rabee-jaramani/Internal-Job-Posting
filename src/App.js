// import Popup from 'reactjs-popup';
import Banner from './banner/Banner';
import Cards from './cards/Cards';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import './style.sass';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
