import React, { useState } from 'react';
import '../styles/DoctorDashboard.css';
import { useAppContext } from '../context/AppContext';

const DoctorDashboard = () => {
  const { appointments, currentUser, setAppointmentStatus, registerPatient } = useAppContext();
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const myAppointments = appointments.filter(a => currentUser && a.doctorId && a.doctorId === currentUser.id);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const updateConsultationStatus = (id, newStatus) => {
    setAppointmentStatus(id, newStatus);
    setSelectedConsultation(null);
  };

  const handleRegisterPatient = (email, name) => {
    const user = registerPatient({ name, email });
    // optionally do something with returned user
    setSelectedConsultation(null);
  };

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <h2>Doctor Dashboard</h2>
      </header>

      <div className="dashboard-content">
        <div className="consultations-list">
          <h3>Upcoming Appointments</h3>
          {myAppointments.length === 0 && <p>No upcoming appointments.</p>}
          {myAppointments.map((consultation) => (
            <div
              key={consultation.id}
              className={`consultation-card ${consultation.status.toLowerCase()}`}
              onClick={() => handleConsultationClick(consultation)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <strong style={{ display: 'block' }}>{consultation.patientName}</strong>
                <small style={{ color: '#666' }}>{consultation.date}</small>
              </div>
              <div>
                <span className={`status ${consultation.status.toLowerCase()}`}>
                  {consultation.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedConsultation && (
          <div className="consultation-details">
            <h3>Consultation Details</h3>
            <div className="details-card">
              <h4>{selectedConsultation.patientName}</h4>
              <p>Email: {selectedConsultation.patientEmail}</p>
              <p>Date: {selectedConsultation.date}</p>
              <div className="action-buttons">
                {selectedConsultation.status === 'Pending' && (
                  <>
                    <button
                      className="start-consultation"
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'In Progress')}
                    >
                      Start Consultation
                    </button>
                    <button
                      className="cancel-consultation"
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'Cancelled')}
                    >
                      Cancel
                    </button>
                    {!selectedConsultation.patientRegistered && (
                      <button
                        className="approve-consultation"
                        onClick={() => handleRegisterPatient(selectedConsultation.patientEmail, selectedConsultation.patientName)}
                      >
                        Register Patient
                      </button>
                    )}
                  </>
                )}
                {selectedConsultation.status === 'In Progress' && (
                  <button
                    className="complete-consultation"
                    onClick={() => updateConsultationStatus(selectedConsultation.id, 'Completed')}
                  >
                    Complete Consultation
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;