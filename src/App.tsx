import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import AuthPage from './pages/auth';
import AuthProvider from './components/firebase_context';
import AppProvider from './components/app_context';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/authenticate" />} />
            <Route path="/authenticate/:refCode?" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
