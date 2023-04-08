import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Ville from './pages/Ville';
import Zone from './pages/Zone';
import Test from './pages/Test';
import Cour from './pages/Cour';
import Garde from './pages/Garde';
import Pharmacie from './pages/Pharmacie';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route extract path='/' element={<Login />} />
        <Route extract path='/Register' element={<Register />} />
        <Route extract path='/Pharmacie' element={<Pharmacie />} />
        <Route extract path='Ville' element={<Ville />} />
        <Route extract path='/Zone' element={<Zone />} />
        <Route extract path='/Garde' element={<Garde />} />
        <Route extract path='/Test' element={<Test />} />
        <Route extract path='Cour' element={<Cour />} />
      </Routes>
    </div>
  );
}

export default App;
