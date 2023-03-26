import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Ville from './pages/Ville';
import Zone from './pages/Zone';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route extract path='/' element={<Login/>} />
        <Route extract path='/Register' element={<Register/>} />
        <Route extract path='Ville' element={<Ville/>} />
        <Route extract path='/Zone' element={<Zone/>} />
      </Routes>
    </div>
  );
}

export default App;
