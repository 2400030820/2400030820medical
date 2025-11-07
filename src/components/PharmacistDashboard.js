import React, { useState } from 'react';
import '../styles/PharmacistDashboard.css';

const PharmacistDashboard = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Twice daily',
      status: 'Pending',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      medication: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      status: 'Processed',
    },
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    setPrescriptions(prescriptions.map(prescription =>
      prescription.id === id
        ? { ...prescription, status: newStatus }
        : prescription
    ));
  };

  return (
    <div className="pharmacist-dashboard">
      <header className="dashboard-header">
        <h2>Pharmacist Dashboard</h2>
      </header>

      <div className="dashboard-content">
        <section className="prescriptions-section">
          <h3>E-Prescriptions</h3>
          <div className="prescriptions-list">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="prescription-card">
                <div className="prescription-info">
                  <h4>{prescription.patientName}</h4>
                  <p><strong>Medication:</strong> {prescription.medication}</p>
                  <p><strong>Dosage:</strong> {prescription.dosage}</p>
                  <p><strong>Frequency:</strong> {prescription.frequency}</p>
                  <span className={`status ${prescription.status.toLowerCase()}`}>
                    {prescription.status}
                  </span>
                </div>
                {prescription.status === 'Pending' && (
                  <div className="action-buttons">
                    <button
                      className="process-button"
                      onClick={() => handleStatusUpdate(prescription.id, 'Processed')}
                    >
                      Process Prescription
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusUpdate(prescription.id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="inventory-section">
          <h3>Medication Inventory</h3>
          <div className="inventory-search">
            <input
              type="text"
              placeholder="Search medications..."
              className="search-input"
            />
          </div>
          {/* Add inventory management functionality here */}
        </section>
      </div>
    </div>
  );
};

export default PharmacistDashboard;