import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route extract path='/' element={<Login/>} />
        <Route extract path='/Register' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
