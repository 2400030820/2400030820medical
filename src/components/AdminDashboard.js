import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Smith',
      email: 'dr.smith@example.com',
      role: 'doctor',
      status: 'active',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'patient',
      status: 'active',
    },
    {
      id: 3,
      name: 'Jane Pharmacist',
      email: 'jane@example.com',
      role: 'pharmacist',
      status: 'pending',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </header>

      <div className="dashboard-content">
        <section className="users-management">
          <h3>User Management</h3>
          <div className="users-filters">
            <select className="role-filter">
              <option value="all">All Roles</option>
              <option value="doctor">Doctors</option>
              <option value="patient">Patients</option>
              <option value="pharmacist">Pharmacists</option>
            </select>
            <select className="status-filter">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <p className="role">{user.role}</p>
                  <span className={`status ${user.status}`}>
                    {user.status}
                  </span>
                </div>
                <div className="user-actions">
                  {user.status === 'pending' && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() => handleStatusChange(user.id, 'active')}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleStatusChange(user.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {user.status === 'active' && (
                    <button
                      className="suspend-button"
                      onClick={() => handleStatusChange(user.id, 'suspended')}
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="system-stats">
          <h3>System Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Users</h4>
              <p>{users.length}</p>
            </div>
            <div className="stat-card">
              <h4>Active Users</h4>
              <p>{users.filter(user => user.status === 'active').length}</p>
            </div>
            <div className="stat-card">
              <h4>Pending Approvals</h4>
              <p>{users.filter(user => user.status === 'pending').length}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;