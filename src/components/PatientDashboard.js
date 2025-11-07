import React, { useState } from 'react';
import '../styles/PatientDashboard.css';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);

  const dummyDoctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Williams', specialty: 'General Physician' },
  ];

  const bookAppointment = (doctor) => {
    const newAppointment = {
      id: appointments.length + 1,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: new Date().toLocaleDateString(),
      status: 'Scheduled',
    };
    setAppointments([...appointments, newAppointment]);
    setShowBooking(false);
  };

  return (
    <div className="patient-dashboard">
      <header className="dashboard-header">
        <h2>Patient Dashboard</h2>
        <button className="primary-button" onClick={() => setShowBooking(!showBooking)}>
          Book New Appointment
        </button>
      </header>

      <div className="dashboard-content">
        <section className="appointments-section">
          <h3>Your Appointments</h3>
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <h4>{appointment.doctor}</h4>
                <p>{appointment.specialty}</p>
                <p>Date: {appointment.date}</p>
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {showBooking && (
          <section className="booking-section">
            <h3>Available Doctors</h3>
            <div className="doctors-list">
              {dummyDoctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                  <button
                    className="book-button"
                    onClick={() => bookAppointment(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;