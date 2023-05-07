import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Ville from './pages/Ville';
import Zone from './pages/Zone';
import Test from './pages/Test';
import Garde from './pages/Garde';
import Pharmacie from './pages/Pharmacie';
import Footer from './components/Footer';
import GardePharmacie from './pages/GardePharmacie';
import Localisation from './components/Localisation';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route extract path='/' element={<Home />} />
        <Route extract path='/Register' element={<Register />} />
        <Route extract path='/Pharmacie' element={<Pharmacie />} />
        <Route extract path='/Ville' element={<Ville />} />
        <Route extract path='/Zone' element={<Zone />} />
        <Route extract path='/Garde' element={<Garde />} />
        <Route extract path='/Test' element={<Test />} />
        <Route path='/Garde_Pharmacie' element={<GardePharmacie/>} />
        <Route path='/Localisation/:id' element={<Localisation/>} />
        <Route path='/Local/:id' element={<Map/>} />
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
