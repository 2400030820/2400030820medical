import React, { useState } from 'react';
import '../styles/PatientDashboard.css';
import { useAppContext } from '../context/AppContext';

const PatientDashboard = () => {
  const { addAppointment, appointments, currentUser } = useAppContext();
  const [showBooking, setShowBooking] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { doctors } = useAppContext();
  const availableDoctors = doctors.length ? doctors : [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Williams', specialty: 'General Physician' },
  ];

  const bookAppointment = (doctor, patientInfo) => {
    const newAppointment = addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: new Date().toLocaleString(),
      patientName: patientInfo.name,
      patientEmail: patientInfo.email,
      patientRegistered: !!patientInfo.registered,
      patientId: patientInfo.id || null,
    });
    setShowBooking(false);
    setSelectedDoctor(null);
    setGuestName('');
    setGuestEmail('');
  };

  const myAppointments = appointments.filter(a => currentUser && (a.patientEmail === currentUser.email));

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
            {myAppointments.length === 0 && <p>No appointments yet.</p>}
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <h4>{appointment.doctorName}</h4>
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
              {availableDoctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                  <button
                    className="book-button"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>

            {selectedDoctor && (
              <div style={{ marginTop: 16 }}>
                <h4>Booking with {selectedDoctor.name}</h4>
                {/* If logged in as a registered patient, prefill info */}
                {currentUser && currentUser.role === 'patient' && currentUser.email ? (
                  <div>
                    <p>Booking as: {currentUser.name} ({currentUser.email})</p>
                    <button className="book-button" onClick={() => bookAppointment(selectedDoctor, { name: currentUser.name, email: currentUser.email, registered: true, id: currentUser.id })}>
                      Confirm Booking
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="form-group">
                      <label>Name</label>
                      <input className="form-control" value={guestName} onChange={e => setGuestName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} />
                    </div>
                    <button className="book-button" onClick={() => bookAppointment(selectedDoctor, { name: guestName, email: guestEmail, registered: false })}>
                      Confirm Guest Booking
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;