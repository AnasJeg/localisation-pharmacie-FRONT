import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRoute from './Auth/AuthRoute';
import AdminRoute from './Auth/AdminRoute';
import PublicRoute from './Auth/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/*" element={<AuthRoute/>}/>
           <Route path="app/*" element={
            <ProtectedRoute>
              <AdminRoute />
            </ProtectedRoute>
          }/>
        </Routes>
     
    </div>
  );
}

export default App;
