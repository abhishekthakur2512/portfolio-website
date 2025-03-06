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
    // At least 3 employees are needed to cover day, night, and on‑call shifts.
    if (n < 3) {
      setWarning("At least 3 employees are required to cover all shifts.");
      return;
    }
    
    setWarning(""); // Clear previous warnings
  
    // Define shift labels and durations:
    const DAY_SHIFT = "Day (08:00 - 20:00)";    // 12h shift
    const NIGHT_SHIFT = "Night (20:00 - 08:00)";  // 12h shift
    const ON_CALL = "On-Call (24h)";              // 24h shift
  
    const startDate = moment();
    const numDays = 28;
    const sampleNames = [
      "Changu", "Mangu", "Bittu", "Idli", "Paaji", 
      "Gappu", "Maggi", "Fanta", "Frooty", "Mithu", 
      "Lappu", "Mario", "Noni", "Manu", "Jalebi",
      "Barfi", "Sandesh", "Peda", "Rasgulla", "Halwa",
      "Falooda", "Rabri", "Papdi", "Kheer", "Chikki"
    ];
    // Randomly select n unique employees.
    let employees = _.shuffle(_.sampleSize(sampleNames, n));
    
    // Initialize overall schedule and each employee's personal schedule.
    let schedule = [];
    let workerSchedules = {};
    employees.forEach(emp => (workerSchedules[emp] = []));
  
    // Track when an employee last worked a night shift (they must be off the next day).
    // Initialize with a value that guarantees availability on day 0.
    let lastNightShift = {};
    employees.forEach(emp => (lastNightShift[emp] = -100));
  
    // Counters for the number of assignments per shift type and total working hours.
    let dayCount = {};
    let nightCount = {};
    let onCallCount = {};
    let totalHours = {};
    employees.forEach(emp => {
      dayCount[emp] = 0;
      nightCount[emp] = 0;
      onCallCount[emp] = 0;
      totalHours[emp] = 0;
    });
  
    // Loop over each day and assign shifts.
    for (let i = 0; i < numDays; i++) {
      let date = startDate.clone().add(i, "days").format("YYYY-MM-DD");
      
      // Build a list of employees available today (those who did not work a night shift yesterday).
      let available = employees.filter(emp => lastNightShift[emp] !== i - 1);
      if (available.length < 3) {
        setWarning(`Not enough employees available on ${date} for fair distribution.`);
        return;
      }
      
      // --- 1. Assign Day Shift ---
      // Pick the employee with the fewest day assignments.
      let minDay = Math.min(...available.map(emp => dayCount[emp]));
      let dayCandidates = available.filter(emp => dayCount[emp] === minDay);
      // Among these, choose the one with the smallest total hours.
      let minTotalDay = Math.min(...dayCandidates.map(emp => totalHours[emp]));
      let finalDayCandidates = dayCandidates.filter(emp => totalHours[emp] === minTotalDay);
      let dayWorker = _.sample(finalDayCandidates);
      // Update counts and total hours.
      dayCount[dayWorker]++;
      totalHours[dayWorker] += 12;
      // Remove from today's pool.
      available = available.filter(emp => emp !== dayWorker);
      
      // --- 2. Assign Night Shift ---
      let minNight = Math.min(...available.map(emp => nightCount[emp]));
      let nightCandidates = available.filter(emp => nightCount[emp] === minNight);
      let minTotalNight = Math.min(...nightCandidates.map(emp => totalHours[emp]));
      let finalNightCandidates = nightCandidates.filter(emp => totalHours[emp] === minTotalNight);
      let nightWorker = _.sample(finalNightCandidates);
      nightCount[nightWorker]++;
      totalHours[nightWorker] += 12;
      // Mark that this employee worked a night shift today so they get the next day off.
      lastNightShift[nightWorker] = i;
      available = available.filter(emp => emp !== nightWorker);
      
      // --- 3. Assign On‑Call Shift ---
      let minOnCall = Math.min(...available.map(emp => onCallCount[emp]));
      let onCallCandidates = available.filter(emp => onCallCount[emp] === minOnCall);
      let minTotalOnCall = Math.min(...onCallCandidates.map(emp => totalHours[emp]));
      let finalOnCallCandidates = onCallCandidates.filter(emp => totalHours[emp] === minTotalOnCall);
      let onCallWorker = _.sample(finalOnCallCandidates);
      onCallCount[onCallWorker]++;
      totalHours[onCallWorker] += 24;
      
      // Record the assignments for the day.
      schedule.push({ date, employee: dayWorker, shift: DAY_SHIFT });
      schedule.push({ date, employee: nightWorker, shift: NIGHT_SHIFT });
      schedule.push({ date, employee: onCallWorker, shift: ON_CALL });
      
      // Also update each employee's personal schedule.
      workerSchedules[dayWorker].push({ date, shift: DAY_SHIFT });
      workerSchedules[nightWorker].push({ date, shift: NIGHT_SHIFT });
      workerSchedules[onCallWorker].push({ date, shift: ON_CALL });
    }
    
    // Finally, update the state with the schedule, per-employee schedules, and cumulative working hours.
    setSchedule(schedule);
    setWorkerSchedules(workerSchedules);
    setHoursWorked(totalHours);
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
          Anil Thakur Doctor Slot Scheduler
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
            <label style={{ fontWeight: "600", fontSize: "1.125rem" }}>Number of Doctors:</label>
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
