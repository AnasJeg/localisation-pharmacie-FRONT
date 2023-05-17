import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRoute from './Auth/AuthRoute';
import AdminRoute from './Auth/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
