// import Popup from 'reactjs-popup';
import Banner from './banner/Banner';
import Cards from './cards/Cards';
import Navbar from './navbar/Navbar';
import './style.sass';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Cards />
    </div>
  );
}

export default App;
