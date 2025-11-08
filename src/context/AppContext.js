import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const initialUsers = [
  { id: 1, name: 'Dr. Smith', email: 'dr.smith@example.com', role: 'doctor', registered: true },
  { id: 2, name: 'Dr. Johnson', email: 'dr.johnson@example.com', role: 'doctor', registered: true },
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'patient', registered: true },
];

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [appointments, setAppointments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    // find existing user by email
    let existing = users.find(u => u.email && user.email && u.email === user.email);
    if (existing) {
      setCurrentUser(existing);
      return existing;
    }

    const newUser = {
      id: Date.now(),
      name: user.name || (user.email ? user.email.split('@')[0] : 'User'),
      email: user.email || null,
      role: user.role || 'patient',
      registered: user.registered !== undefined ? user.registered : true,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => setCurrentUser(null);

  const addAppointment = ({ doctorId, doctorName, specialty, date, patientName, patientEmail, patientRegistered, patientId }) => {
    const appointment = {
      id: Date.now(),
      doctorId: doctorId || null,
      doctorName: doctorName || null,
      specialty: specialty || null,
      date: date || new Date().toLocaleString(),
      patientName: patientName || 'Guest',
      patientEmail: patientEmail || null,
      patientRegistered: !!patientRegistered,
      patientId: patientId || null,
      status: 'Pending',
    };
    setAppointments(prev => [appointment, ...prev]);
    return appointment;
  };

  const setAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const registerPatient = ({ name, email }) => {
    if (!email) return null;
    const existing = users.find(u => u.email === email);
    if (existing) return existing;
    const newUser = { id: Date.now(), name: name || email.split('@')[0], email, role: 'patient', registered: true };
    setUsers(prev => [...prev, newUser]);
    // mark any appointments from this email as registered
    setAppointments(prev => prev.map(a => a.patientEmail === email ? { ...a, patientRegistered: true, patientId: newUser.id } : a));
    return newUser;
  };

  const doctors = users.filter(u => u.role === 'doctor');

  return (
    <AppContext.Provider value={{ users, doctors, appointments, currentUser, login, logout, addAppointment, setAppointmentStatus, registerPatient }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
