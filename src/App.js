import React, { useState } from 'react';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import PharmacistDashboard from './components/PharmacistDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  const renderDashboard = () => {
    switch (userType) {
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
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="dashboard-container">
          <nav className="navbar">
            <h1 className="app-title">MedConnect</h1>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
          {renderDashboard()}
        </div>
      )}
    </div>
  );
}

export default App;