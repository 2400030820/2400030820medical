import React from 'react';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import PharmacistDashboard from './components/PharmacistDashboard';
import './App.css';
import { useAppContext } from './context/AppContext';

function App() {
  const { currentUser, logout } = useAppContext();

  const renderDashboard = () => {
    if (!currentUser) return null;
    const role = currentUser.role || currentUser.userType || 'patient';
    switch (role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'pharmacist':
        return <PharmacistDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {!currentUser ? (
        <Login />
      ) : (
        <div className="dashboard-container">
          <nav className="navbar">
            <h1 className="app-title">MedConnect</h1>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: '#2c3e50' }}>{currentUser.name}</span>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </nav>
          {renderDashboard()}
        </div>
      )}
    </div>
  );
}

export default App;