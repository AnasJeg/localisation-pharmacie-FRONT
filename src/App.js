import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRoute from './Auth/AuthRoute';
import AdminRoute from './Auth/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';


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
