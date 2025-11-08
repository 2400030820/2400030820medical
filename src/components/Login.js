import React, { useState } from 'react';
import '../styles/Login.css';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const { login, doctors } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [name, setName] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { role: userType, name: name || (email ? email.split('@')[0] : 'User'), email, registered: true, doctorId: selectedDoctorId };
    // if a doctor was selected from list, prefer that identity
    if (userType === 'doctor' && selectedDoctorId) {
      const doc = doctors.find(d => String(d.id) === String(selectedDoctorId));
      if (doc) {
        login(doc);
        return;
      }
    }
    login(user);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>MedConnect Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-control"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          {userType === 'doctor' && (
            <div className="form-group">
              <label>Select Doctor Account</label>
              <select className="form-control" value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
                <option value="">-- choose doctor --</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name} ({doc.email})</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;