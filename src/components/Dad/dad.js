import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";

export default function JobScheduler() {
  const [n, setN] = useState(9);
  const [schedule, setSchedule] = useState([]);
  const [workHours, setWorkHours] = useState([]);
  const [workerSchedules, setWorkerSchedules] = useState({});
  const [warning, setWarning] = useState("");

  const createTimeTable = (n) => {
    if (n < 2) {
      setWarning("At least 2 employees are required to cover shifts.");
      return;
    }

    setWarning(""); // Clear previous warnings
    const DAY_SHIFT = "Day (08:00 - 20:00)";
    const NIGHT_SHIFT = "Night (20:00 - 08:00)";
    const ON_CALL = "On-Call (24h)";
    
    const startDate = moment();
    const numDays = 28;
    
    const sampleNames = ["Changu", "Mangu", "Bittu", "Idli", "Paaji", "Gappu", "Maggi", "Fanta", "Frooty", "Mithu", "Lappu", "Mario"];
    let employees = _.shuffle(_.sampleSize(sampleNames, n));
    
    let schedule = [];
    let workerSchedules = _.zipObject(employees, Array(n).fill([]));
    let lastNightShift = _.zipObject(employees, Array(n).fill(null));
    let lastOnCallShift = _.zipObject(employees, Array(n).fill(null));
    let hoursWorked = _.zipObject(employees, Array(n).fill(0));
    let onCallCount = _.zipObject(employees, Array(n).fill(0));
    
    for (let i = 0; i < numDays; i++) {
      let date = startDate.clone().add(i, "days").format("YYYY-MM-DD");
      let availableEmployees = [...employees];

      availableEmployees = availableEmployees.filter(
        (emp) => lastNightShift[emp] !== i - 1 && lastOnCallShift[emp] !== i - 1
      );
      
      availableEmployees = _.sortBy(availableEmployees, (emp) => hoursWorked[emp]);
      
      let dayWorker = availableEmployees.shift();
      let nightWorker = availableEmployees.shift();
      let onCallWorker = _.minBy(availableEmployees, (emp) => onCallCount[emp]);
      
      lastNightShift[nightWorker] = i;
      lastOnCallShift[onCallWorker] = i;
      
      hoursWorked[dayWorker] += 12;
      hoursWorked[nightWorker] += 12;
      hoursWorked[onCallWorker] += 24;
      onCallCount[onCallWorker] += 1;
      
      let maxHours = _.max(_.values(hoursWorked));
      if (maxHours > 192) {
        let requiredN = Math.ceil((maxHours * n) / 192);
        setWarning(`Workload warning! Max hours worked: ${maxHours}. Consider increasing employees to at least ${requiredN}.`);
      }
      
      schedule.push({ date, employee: dayWorker, shift: DAY_SHIFT });
      schedule.push({ date, employee: nightWorker, shift: NIGHT_SHIFT });
      schedule.push({ date, employee: onCallWorker, shift: ON_CALL });
      
      workerSchedules[dayWorker] = [...workerSchedules[dayWorker], { date, shift: DAY_SHIFT }];
      workerSchedules[nightWorker] = [...workerSchedules[nightWorker], { date, shift: NIGHT_SHIFT }];
      workerSchedules[onCallWorker] = [...workerSchedules[onCallWorker], { date, shift: ON_CALL }];
    }
    
    setSchedule(schedule);
    setWorkHours(Object.entries(hoursWorked).map(([employee, hours]) => ({ employee, hours })));
    setWorkerSchedules(workerSchedules);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Job Scheduler</h1>
      <div className="mb-4">
        <label className="mr-2">Number of Employees:</label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="border p-2"
        />
        <button
          onClick={() => createTimeTable(n)}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Generate Schedule
        </button>
      </div>
      
      {warning && <p className="text-red-500 mb-4">{warning}</p>}
      
      {schedule.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-4">Schedule</h2>
          <table className="w-full border mt-2">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">  Employee </th>
                <th className="border p-2">Shift </th>
              </tr>
            </thead>
            <hr></hr>
            <tbody>
              {schedule.map((entry, index) => (
                <tr key={index}>
                  <td className="border p-2">|  {entry.date}</td>
                  <td className="border p-2">|  {entry.employee}  </td>
                  <td className="border p-2">|  {entry.shift} </td>
                  <hr></hr>
                </tr>
              ))}
            </tbody>
          </table>
          
          <h2 className="text-lg font-semibold mt-4">Individual Worker Schedules</h2>
          {Object.entries(workerSchedules).map(([employee, shifts]) => (
            <div key={employee} className="mt-4">
              <h3 className="font-semibold">{employee}</h3>
              <table className="w-full border mt-2">
                <thead>
                  <tr>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Shift</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((entry, index) => (
                    <tr key={index}>
                      <td className="border p-2">|  {entry.date}</td>
                      <td className="border p-2">|  {entry.shift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
}