import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";
import WorkerSchedules from "./workerScheduler";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">Job Scheduler</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-lg">Number of Employees:</label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded w-20 text-center"
            />
          </div>
          <button
            onClick={() => createTimeTable(n)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Generate Schedule
          </button>
        </div>
        {warning && (
          <p className="text-red-500 font-semibold text-center mb-4">{warning}</p>
        )}
        <hr className="my-6 border-t-2 border-gray-300" />
        {schedule.length > 0 && (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Schedule</h2>
              <table className="w-full border-collapse border border-gray-300 rounded-lg shadow">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border p-3">Date</th>
                    <th className="border p-3">Employee</th>
                    <th className="border p-3">Shift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {schedule.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-3">{entry.date}</td>
                      <td className="border p-3">{entry.employee}</td>
                      <td className="border p-3">{entry.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr className="border-t-2 border-gray-300" />
            {/* <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Individual Worker Schedules</h2>
              {Object.entries(workerSchedules).map(([employee, shifts]) => (
                <div key={employee} className="mb-6 p-4 bg-gray-50 shadow-md rounded-lg">
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">{employee}</h3>
                  <table className="w-full border-collapse border border-gray-300 rounded-lg shadow">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="border p-3">Date</th>
                        <th className="border p-3">Shift</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {shifts.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border p-3">{entry.date}</td>
                          <td className="border p-3">{entry.shift}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div> */}

            <div>
              <WorkerSchedules workerSchedules={workerSchedules}/>
            </div>
            <hr className="border-t-2 border-gray-300" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cumulative Work Hours
              </h2>
              <table className="w-full border-collapse border border-gray-300 rounded-lg shadow">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border p-3">Employee</th>
                    <th className="border p-3">Hours Worked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {Object.entries(hoursWorked).map(([employee, hours]) => (
                    <tr key={employee} className="hover:bg-gray-50">
                      <td className="border p-3">{employee}</td>
                      <td className="border p-3">{hours} hours</td>
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
