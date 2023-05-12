import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthRoute from './Auth/AuthRoute';
import AdminRoute from './Auth/AdminRoute';
import PublicRoute from './Auth/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
           <Route path="/*" element={
            <ProtectedRoute>
              <AdminRoute />
            </ProtectedRoute>
          }/>
          <Route path="/" element={<AuthRoute/>}/>
        </Routes>
    <Footer/>
    </div>
  );
}

export default App;
