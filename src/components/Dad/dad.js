import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";

export default function JobScheduler() {
  const [n, setN] = useState(9);
  const [schedule, setSchedule] = useState([]);
  const [workerSchedules, setWorkerSchedules] = useState({});
  const [hoursWorked, setHoursWorked] = useState({});
  const [warning, setWarning] = useState("");

  const createTimeTable = (n) => {
    if (n < 2) {
      setWarning("At least 2 employees are required to cover shifts.");
      return;
    }
  
    setWarning(""); // Clear previous warnings
  
    // Shift labels with their respective timings and durations:
    const DAY_SHIFT = "Day (08:00 - 20:00)";      // 12h shift
    const NIGHT_SHIFT = "Night (20:00 - 08:00)";    // 12h shift
    const ON_CALL = "On-Call (24h)";                // 24h shift
  
    const startDate = moment();
    const numDays = 28;
    const sampleNames = [
      "Changu", "Mangu", "Bittu", "Idli", "Paaji", "Gappu", 
      "Maggi", "Fanta", "Frooty", "Mithu", "Lappu", "Mario", 
      "Noni", "Manu"
    ];
    let employees = _.shuffle(_.sampleSize(sampleNames, n));
  
    // Initialize overall schedule, each worker's schedule, and cumulative working hours.
    let schedule = [];
    let workerSchedules = _.zipObject(employees, Array(n).fill([]));
    let lastNightShift = _.zipObject(employees, Array(n).fill(null));
    let hoursWorked = _.zipObject(employees, Array(n).fill(0));
    
    for (let i = 0; i < numDays; i++) {
      let date = startDate.clone().add(i, "days").format("YYYY-MM-DD");
      // Exclude employees who worked a night shift the previous day.
      let availableEmployees = [...employees].filter(emp => lastNightShift[emp] !== i - 1);
      // Sort employees by cumulative hours worked for fair distribution.
      availableEmployees = _.sortBy(availableEmployees, (emp) => hoursWorked[emp]);
  
      // We need 3 employees per day: 1 for day shift, 1 for night shift, and 1 for on-call.
      if (availableEmployees.length < 3) {
        setWarning("Not enough employees available for fair shift distribution.");
        return;
      }
  
      let dayWorker = availableEmployees.shift();
      let nightWorker = availableEmployees.shift();
      let onCallWorker = availableEmployees.shift();
  
      // Mark the night shift worker so they get the next day off.
      lastNightShift[nightWorker] = i;
      
      // Update cumulative hours:
      // Day and Night shifts add 12h each; on-call adds 24h.
      hoursWorked[dayWorker] += 12;
      hoursWorked[nightWorker] += 12;
      hoursWorked[onCallWorker] += 24;
  
      // Build the daily schedule.
      schedule.push({ date, employee: dayWorker, shift: DAY_SHIFT });
      schedule.push({ date, employee: nightWorker, shift: NIGHT_SHIFT });
      schedule.push({ date, employee: onCallWorker, shift: ON_CALL });
  
      // Build each employee's personal schedule.
      workerSchedules[dayWorker] = [
        ...workerSchedules[dayWorker],
        { date, shift: DAY_SHIFT }
      ];
      workerSchedules[nightWorker] = [
        ...workerSchedules[nightWorker],
        { date, shift: NIGHT_SHIFT }
      ];
      workerSchedules[onCallWorker] = [
        ...workerSchedules[onCallWorker],
        { date, shift: ON_CALL }
      ];
    }
    
    // Update state with the generated schedule and cumulative working hours.
    setSchedule(schedule);
    setWorkerSchedules(workerSchedules);
    setHoursWorked(hoursWorked);
  };
  

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          backgroundColor: "#fff",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          borderRadius: "1rem",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "800",
            fontSize: "1.875rem",
            marginBottom: "2rem",
            color: "#3182ce",
          }}
        >
          Job Scheduler
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontWeight: "600", fontSize: "1.125rem" }}>Number of Employees:</label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              style={{
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                width: "5rem",
                textAlign: "center",
              }}
            />
          </div>
          <button
            onClick={() => createTimeTable(n)}
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontWeight: "bold",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Generate Schedule
          </button>
        </div>
        {warning && (
          <p
            style={{
              color: "#ef4444",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {warning}
          </p>
        )}
        <hr style={{ margin: "1.5rem 0", borderTop: "2px solid #d1d5db" }} />
        {schedule.length > 0 && (
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "1rem",
                }}
              >
                Schedule
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <thead style={{ backgroundColor: "#dbeafe" }}>
                  <tr>
                    <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Date</th>
                    <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Employee</th>
                    <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((entry, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #d1d5db" }}>
                      <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>{entry.date}</td>
                      <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>{entry.employee}</td>
                      <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>{entry.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr style={{ margin: "1.5rem 0", borderTop: "2px solid #d1d5db" }} />
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "1rem",
                }}
              >
                Individual Worker Schedules
              </h2>
              {Object.entries(workerSchedules).map(([employee, shifts]) => (
                <div
                  key={employee}
                  style={{
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {employee}
                  </h3>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <thead style={{ backgroundColor: "#dbeafe" }}>
                      <tr>
                        <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Date</th>
                        <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Shift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shifts.map((entry, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #d1d5db" }}>
                          <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>
                            {entry.date}
                          </td>
                          <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>
                            {entry.shift}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <hr style={{ margin: "1.5rem 0", borderTop: "2px solid #d1d5db" }} />
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "1rem",
                }}
              >
                Cumulative Work Hours
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <thead style={{ backgroundColor: "#dbeafe" }}>
                  <tr>
                    <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Employee</th>
                    <th style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>Hours Worked</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(hoursWorked).map(([employee, hours]) => (
                    <tr key={employee} style={{ borderBottom: "1px solid #d1d5db" }}>
                      <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>{employee}</td>
                      <td style={{ border: "1px solid #d1d5db", padding: "0.75rem" }}>{hours} hours</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
    
}
