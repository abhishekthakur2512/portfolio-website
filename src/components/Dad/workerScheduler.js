import React from 'react';

const styles = {
  container: {
    margin: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '16px',
  },
  scheduleCard: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  employeeName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  th: {
    border: '1px solid #ccc',
    padding: '12px',
    backgroundColor: '#e0f7fa',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ccc',
    padding: '12px',
  },
  row: {
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
};

const WorkerSchedules = ({ workerSchedules }) => {
  console.log('working');
  return (
  <div style={styles.container}>
    <h2 style={styles.title}>Individual Worker Schedules</h2>
    {Object.entries(workerSchedules).map(([employee, shifts]) => (
      <div key={employee} style={styles.scheduleCard}>
        <h3 style={styles.employeeName}>{employee}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Shift</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((entry, index) => (
              <tr
                key={index}
                style={styles.row}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#f1f1f1')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                <td style={styles.td}>{entry.date}</td>
                <td style={styles.td}>{entry.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
  )
};

export default WorkerSchedules;
