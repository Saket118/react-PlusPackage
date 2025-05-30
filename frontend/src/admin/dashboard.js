import React from 'react';

const Dashboard = () => {
  const email = localStorage.getItem('email'); // Retrieve email from local storage

  return (
    <div className="container my-4">
      <h2>Dashboard</h2>
      <hr />
      {email && (
        <p>
          <strong style={{ color: 'green' }}>Logged in as:</strong> <span style={{ backgroundColor: 'yellow' }}>{email}</span>
        </p>
      )}
    </div>
  );
};

export default Dashboard;
