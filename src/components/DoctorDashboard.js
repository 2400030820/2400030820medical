import React, { useState } from 'react';
import '../styles/DoctorDashboard.css';

const DoctorDashboard = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2025-11-07',
      time: '10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2025-11-07',
      time: '11:30 AM',
      status: 'Completed',
    },
  ]);

  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const updateConsultationStatus = (id, newStatus) => {
    setConsultations(consultations.map(consultation =>
      consultation.id === id
        ? { ...consultation, status: newStatus }
        : consultation
    ));
    setSelectedConsultation(null);
  };

  return (
    <div className="doctor-dashboard">
      <header className="dashboard-header">
        <h2>Doctor Dashboard</h2>
      </header>

      <div className="dashboard-content">
        <div className="consultations-list">
          <h3>Today's Consultations</h3>
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className={`consultation-card ${consultation.status.toLowerCase()}`}
              onClick={() => handleConsultationClick(consultation)}
            >
              <div className="consultation-info">
                <h4>{consultation.patientName}</h4>
                <p>Time: {consultation.time}</p>
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
              <p>Date: {selectedConsultation.date}</p>
              <p>Time: {selectedConsultation.time}</p>
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